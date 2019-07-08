import React from 'react';
import {ProductConsumer} from '../context';
import Title from './Title';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default class Details extends React.Component {
  componentDidMount(){

  }

  render() {
    const urlId = Number(this.props.match.params.id);
    return(
      <ProductConsumer>
        {value => {
          const {id, img, info, price, title, inCart} = value.detailProduct;
          return(
            <React.Fragment>
              <Container  maxWidth="lg" onLoad={()=>value.handleDetail(urlId)} >
                <Typography component="div" style={{ backgroundColor: '#fff', height: '100%' }}>
                  <div display="flex">
                    <Title name={title} />
                    <img src={window.location.origin + '/' +img} alt={title} />
                    <p><strong>${price}</strong></p>
                    <p>{info.substring(0, 150)}</p>
                    <p>Color:</p>
                    <p>Size:</p>
                    <Button
                      variant="contained"
                      style={{backgroundColor: 'orange'}}
                      disabled={inCart ? true : false}
                      onClick={()=>{
                        value.addToCart(id);
                      }}
                    >
                      {inCart ? (<span>In Cart</span>) : (<span>Add to Cart</span>)}
                    </Button>

                  </div>
                </Typography>
              </Container>
            </React.Fragment>

          )
        }}
      </ProductConsumer>
    )
  }
}
