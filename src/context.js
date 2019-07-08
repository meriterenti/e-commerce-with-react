import React from 'react';
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTax: 0,
      cartTotal: 0,
      currentPage: 1,
      itemsPerPage: 5
    };
  };
  componentDidMount(){
    this.setProducts();
    this.setState({cart : !localStorage.getItem('myCart') ? []: JSON.parse(localStorage.getItem('myCart'))})
    this.setState({cartSubTotal : !localStorage.getItem('subTotal') ? []: JSON.parse(localStorage.getItem('subTotal'))})
    this.setState({cartTax : !localStorage.getItem('tax') ? []: JSON.parse(localStorage.getItem('tax'))})
    this.setState({cartTotal : !localStorage.getItem('total') ? []: JSON.parse(localStorage.getItem('total'))})
  };
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = {...item};
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() =>{
    //  return {products: tempProducts}
      return {products : !localStorage.getItem('allProd') ? tempProducts: JSON.parse(localStorage.getItem('allProd'))}
    }, ()=>{
      localStorage.setItem('allProd', JSON.stringify(this.state.products))
    })
  };
  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };
  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(()=>{return {detailProduct: product} });
  };
  addToCart = id => {
    let cartProducts = [...this.state.products]
    const index = cartProducts.indexOf(this.getItem(id));
    const inCartProduct = cartProducts[index];
    inCartProduct.inCart = true;
    inCartProduct.count = 1;
    const price = inCartProduct.price;
    inCartProduct.total = price;
    this.setState(() => {
      return {products: cartProducts, cart: [...this.state.cart, inCartProduct]}
    }, () => {
      this.addTotals();
      localStorage.setItem('myCart', JSON.stringify(this.state.cart))
      localStorage.setItem('allProd', JSON.stringify(this.state.products))
    });
  };
  openModal = id => {
    const modalProduct = this.getItem(id);
    this.setState(()=>{return {modalProduct: modalProduct, modalOpen: true} });
  };
  closeModal = () => {
    this.setState(()=>{return {modalOpen: false} });
  };
  increment = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count++;
    product.total = product.count * product.price;
    this.setState(()=>{
      return {cart: [...tempCart]}
    }, ()=>{
      this.addTotals();
      localStorage.setItem('myCart', JSON.stringify(this.state.cart));
    })
  };
  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    if(product.count < 2){
      return null;
    } else {
      product.count--;
      product.total = product.count * product.price;
      this.setState(()=>{
        return {cart: [...tempCart]}
      }, ()=>{
        this.addTotals();
        localStorage.setItem('myCart', JSON.stringify(this.state.cart));
      })
    }
  };
  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id))
    let removedProduct = tempProducts[index]
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(()=> {
      return {
        cart: [...tempCart],
        products: [...tempProducts]
      }
    }, ()=>{
      this.addTotals();
      localStorage.setItem('myCart', JSON.stringify(this.state.cart));
      localStorage.setItem('allProd', JSON.stringify(this.state.products));
    })
  };
  clearCart = () => {
    let tempProducts = [...this.state.products]
    tempProducts.map(item=>item.inCart = false)
    this.setState(()=>{
      return {cart: [], products: [...tempProducts]}
    },()=>{
      this.setProducts();
      this.addTotals();
      localStorage.setItem('myCart', JSON.stringify(this.state.cart));
      localStorage.setItem('allProd', JSON.stringify(this.state.products));
    })
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total))
    const tempTax = subTotal * 0.2;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(()=>{
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      }
    }, () => {
      localStorage.setItem('subTotal', JSON.stringify(this.state.cartSubTotal))
      localStorage.setItem('tax', JSON.stringify(this.state.cartTax))
      localStorage.setItem('total', JSON.stringify(this.state.cartTotal))
    })
  }
  handleSearch = val => {
    this.setState({currentPage: 1});
    val = val.toLowerCase();
    const products = localStorage.getItem('allProd') ? JSON.parse(localStorage.getItem('allProd')): [...this.state.products];
    const tempProducts = [...products]
    let filteredProducts = tempProducts.filter(item =>item.title.toLowerCase().startsWith(val));
    this.setState(()=> {
      return { products: [...filteredProducts] }
    })
  }
  handlePageChange = pageNumber => {
    this.setState({currentPage: pageNumber});
  }
  handlePrevNextPage = (value) => {
    console.log(value)
    let pages = this.state.products.length / this.state.itemsPerPage
    let page = this.state.currentPage
    if(value === 'prev'){
      if(page < 2){
        return null
      }
      this.setState({currentPage: page-1});
    }else{
      if(page >= pages) {
        return null
      }
      this.setState({currentPage: page+1});
    }
  }
  render(){
    return(
      <ProductContext.Provider value={{
        ...this.state,
        setProducts: this.setProducts,
        handleDetail: this.handleDetail,
        openModal: this.openModal,
        closeModal: this.closeModal,
        addToCart: this.addToCart,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart,
        handleSearch: this.handleSearch,
        handlePageChange: this.handlePageChange,
        handlePrevNextPage: this.handlePrevNextPage
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer};
