import React from 'react';

import Button from '@material-ui/core/Button';

export default function CartTotals(props) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = props.value;
  return(
    <React.Fragment>
      <p>Subtotal: ${cartSubTotal}</p>
      <p>Tax: ${cartTax}</p>
      <p>Total: ${cartTotal}</p>
      <Button variant="contained" color="secondary" onClick={()=>clearCart()}>Clear Cart</Button>
    </React.Fragment>
  )
}
