import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import {ProductConsumer} from '../context';

import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Visibility from '@material-ui/icons/Visibility';
import Fab from '@material-ui/core/Fab';

export default class Product extends React.Component {
  render() {
    const { id, title, img, price, inCart, info } = this.props.product;
    return(
      <Box width="300px" mb={3}>
        <Card>
          <CardHeader
            title={title}
          />
          <ProductConsumer>
                {value => (
                  <div>
                    <Link to={`/details/${id}`}>
                      <img width="200px" src={img} alt={title} onClick={() => value.handleDetail(id) } />
                    </Link>
                    <Fab
                      color="primary"
                      onClick={()=>{
                        value.openModal(id);
                      }}
                    >
                      <Visibility />
                    </Fab>
                    <Button
                      variant="contained"
                      style={{backgroundColor: 'orange'}}
                      disabled={inCart ? true : false}
                      onClick={()=>{
                        value.addToCart(id);
                      }}
                    >
                    {inCart ? (<span>In Cart</span>) : (<AddShoppingCart />)}
                    </Button>
                  </div>
                )}
            </ProductConsumer>
          <CardContent>
            <Button variant="contained" color="secondary">${price}</Button>
            <Typography variant="body2" color="textSecondary" component="p">
              {info.substring(0,100)}
            </Typography>
          </CardContent>
          <CardActions>
          </CardActions>
        </Card>
      </Box>
    )
  }
}

Product.propTypes = {
  product:PropTypes.shape({
    id:PropTypes.number,
    img:PropTypes.string,
    title:PropTypes.string,
    price:PropTypes.number,
    inCart:PropTypes.bool
  }).isRequired
}
