import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import Contactdata from './ContactData/ContactData';
import * as actions from '../../store/actions/'

class Checkout extends Component {
  constructor(props) {
    super(props);

    this.checkoutCancelledHandler = this.checkoutCancelledHandler.bind(this);
    this.checkoutContinuedHandler = this.checkoutContinuedHandler.bind(this);
  }

  checkoutCancelledHandler() {
    this.props.history.goBack();
  }

  checkoutContinuedHandler() {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    if (! this.props.ingredients || this.props.purchased) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutCancel={this.checkoutCancelledHandler}
          onCheckoutContinue={this.checkoutContinuedHandler}
        />

        <Route path={this.props.match.path + '/contact-data'} component={Contactdata} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.builder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);