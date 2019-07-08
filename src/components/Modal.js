import React from 'react';
import { Link } from 'react-router-dom';
import {ProductConsumer} from '../context';

import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddShoppingCart from '@material-ui/icons/AddShoppingCart';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


export default class Modal extends React.Component {
  render() {
    return(
      <ProductConsumer>
      {value => {
        const {modalOpen, closeModal} = value;
        const {id, img, title, inCart, price} = value.modalProduct
        if(!modalOpen){
          return null
        } else{
          return(
            <div>
              <Dialog
                onClose={()=>closeModal()}
                aria-labelledby="customized-dialog-title"
                open={modalOpen}
              >
              <Box className="box123" p={2}>
              <DialogTitle id="customized-dialog-title" onClose={()=>closeModal()}>
                {title}
              </DialogTitle>
                <img width="250px" src={img} alt={title} />
                <p>PRICE: ${price}</p>
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
                <Link to='/cart'>
                  <Button variant="outlined" color="secondary" onClick={()=>closeModal()}>
                    Go to the Cart
                  </Button>
                </Link>
                </Box>
              </Dialog>
            </div>
          )
        }
      }}
      </ProductConsumer>
    )
  }
}
