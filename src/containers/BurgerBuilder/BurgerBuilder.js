import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurguerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false
    }
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 })
  }

  addIngredientHandler(type) {
    const count = this.state.ingredients[type];
    const newCount = count + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = newCount;

    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler(type) {
    const count = this.state.ingredients[type];
    const newCount = count - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = (newCount >= 0) ? newCount : 0;

    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - priceDeduction;

    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  modalDismissedHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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

    axios.post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalDismissed={this.modalDismissedHandler.bind(this)} >
          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseContinue={this.purchaseContinueHandler.bind(this)}
            purchaseCancel={this.modalDismissedHandler.bind(this)}
          />
          <p>Lorem, ipsum dolor.</p>
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          added={this.addIngredientHandler.bind(this)}
          removed={this.removeIngredientHandler.bind(this)}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler.bind(this)}
        />
      </Aux>
    );
  }
}

export default BurguerBuilder;