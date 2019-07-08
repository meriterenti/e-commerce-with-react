import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Modal from './components/Modal';
import Default from './components/Default';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function App() {
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Typography component="div" style={{ backgroundColor: '#fff', height: '100%' }}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ProductList} />
            <Route path="/details/:id" component={Details} />
            <Route path="/cart" component={Cart} />
            <Route component={Default} />
          </Switch>
          <Modal />
        </Typography>
      </Container>
    </React.Fragment>
  );
}

export default App;
