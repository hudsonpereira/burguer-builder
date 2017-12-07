import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/';

class ContactData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      address: {
        street: '',
        postalCode: ''
      },
      loading: false
    }

    this.orderHandler = this.orderHandler.bind(this)
  }

  orderHandler(event) {
    event.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Hudson Pereira',
        address: {
          street: "Teststreet 1",
          zipCode: 45678,
          country: "Germany"
        },
        email: 'hudson.webdeveloper@gmail.com'
      },
      deliveryMethod: 'fastest'
    };

    this.props.onOrderBurger(order);
  }

  render() {
    if (this.props.loading) {
      return <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>

        <form action="">
          <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
          <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
          <input className={classes.Input} type="text" name="street" placeholder="Street" />
          <input className={classes.Input} type="text" name="postalCode" placeholder="Postal Code" />

          <Button type="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    price: state.builder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (order) => dispatch(actions.purchaseBurger(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));