import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

import {ProductConsumer} from '../../context';
import Title from '../Title';
import CartColumns from './CartColumns';
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotals from './CartTotals';


class Cart extends React.Component {
  render() {
    return(
      <div>
        <ProductConsumer>
          {value=>{
            const {cart} = value;
            if(cart.length>0){
              return(
                <React.Fragment>
                  <Title name="My Cart" />
                  <Table>
                    <TableHead>
                      <CartColumns value={value} />
                    </TableHead>
                    <TableBody>
                      <CartList value={value} />
                    </TableBody>
                  </Table>
                  <CartTotals value={value} />
                </React.Fragment>
              )
            } else {
              return <EmptyCart />
            }
          }}
        </ProductConsumer>
      </div>
    )
  }
}

export default Cart;
