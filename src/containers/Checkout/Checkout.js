import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  }

  constructor(props) {
    super(props);

    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
  }

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    for (let param of query.entries()) {
      const first = param[0];
      const second = param[1];

      ingredients[first] = +second;
    }

    this.setState({ingredients});
  }

  checkoutCancelledHandler() {
    this.props.history.goBack();
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancel={this.checkoutCancelledHandler}
          onCheckoutContinue={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}

export default Checkout;