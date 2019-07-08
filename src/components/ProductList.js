import React from 'react';

import Box from '@material-ui/core/Box';

import {ProductConsumer} from '../context';
import Product from './Product';
import Title from './Title';

export default class ProductList extends React.Component {
  render() {
    return(
      <React.Fragment>
        <Title name="here must be a pagination"/>
        <Box  maxWidth="lg" display="flex" justifyContent="center">
            <Box width="90%" display="flex" flexWrap="wrap" justifyContent="space-around">
              <ProductConsumer>
                {(val)=>{
                  return val.products.map(product => {
                    return <Product flexGrow={1} key={product.id} product={product} />
                  })
                }}
              </ProductConsumer>
            </Box>
        </Box>
      </React.Fragment>
    )
  }
}
