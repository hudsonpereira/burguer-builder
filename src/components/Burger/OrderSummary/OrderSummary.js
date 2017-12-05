import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(key => {
        return <li key={key}><span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}</li>
      })

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>

        <ul>
          {ingredientSummary}
        </ul>

        <p>Continue to checkout?</p>

        <Button type="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button type="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </Aux>
    );
  }
}

export default OrderSummary;