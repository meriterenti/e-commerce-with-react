import React from 'react';
import CartItem from './CartItem';

export default function CartList(props) {
  const {cart} = props.value;
  return(
    <React.Fragment>
      {cart.map(v => {
        return <CartItem key={v.id} item={v} value={props.value}/>
      })}
    </React.Fragment>
  )
}
