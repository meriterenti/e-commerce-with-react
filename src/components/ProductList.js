import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import {ProductConsumer} from '../context';
import Product from './Product';
import Title from './Title';

export default class ProductList extends React.Component {

  render() {
    return(
      <React.Fragment>
        <ProductConsumer>
          {value=>{
            const {handlePageChange, currentPage, itemsPerPage, products, handlePrevNextPage} = value;
            const indexOfLastProduct = currentPage * itemsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
            const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
            const renderProducts = currentProducts.map((product, index) => {
              return <Product flexGrow={1} key={product.id+index} product={product} />
            });
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
              pageNumbers.push(i);
            }
            const renderPageNumbers = pageNumbers.map(number => {
              return (
                <li
                  key={'k'+number}
                  id={number}
                  onClick={(e)=>handlePageChange(e.target.innerHTML)}
                >
                  <Button
                    color="primary"
                    variant={Number(currentPage) === number ? "contained": "text" }
                  >{number}</Button>
                </li>
              );
            });
            return (
              <React.Fragment>
                <Title name="Mobile Store" />
                <Box  maxWidth="lg" display="flex" justifyContent="center">
                  <Box width="90%" display="flex" flexWrap="wrap" justifyContent="space-around">
                    {renderProducts}
                  </Box>
                </Box>
                <Box>
                  <ul id="page-numbers">
                    <IconButton
                      color="primary"
                      disabled={Number(currentPage) < 2}
                      onClick={()=>handlePrevNextPage('prev')}
                    >
                      <ChevronLeft  />
                    </IconButton>
                    {renderPageNumbers}
                    <IconButton
                      color="primary"
                      disabled={Number(currentPage) >= Math.ceil(products.length / itemsPerPage)}
                      onClick={()=>handlePrevNextPage('next')}
                    >
                      <ChevronRight />
                    </IconButton>
                  </ul>
                </Box>
              </React.Fragment>
            )
          }}
        </ProductConsumer>
      </React.Fragment>
    )
  }
}
