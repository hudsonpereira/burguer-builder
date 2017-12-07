import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurguerBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchasing: false,
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    axios.get('/ingredients.json')
      .then(response => {
        this.setState({ingredients: response.data});
      })
      .catch(error => {
        this.setState({error: true});
      })
  }

  isPurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  modalDismissedHandler() {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler() {
    const query = [];

    for(let i in this.state.ingredients) {
      query.push(encodeURIComponent(i) + '='  + encodeURIComponent(this.state.ingredients[i]))
    }

    query.push('price=' + this.state.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + query.join('&')
    });
  }

  render() {
    if (this.state.error) {
      return <p>Ingredients can't be loaded</p>
    }

    const disabledInfo = {
      ...this.props.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    const orderSummary = (
      <OrderSummary
        ingredients={this.props.ingredients}
        purchaseContinue={this.purchaseContinueHandler.bind(this)}
        purchaseCancel={this.modalDismissedHandler.bind(this)}
      />
    );

    let burger = <Spinner />

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            // added={this.addIngredientHandler.bind(this)}
            added={this.props.onIngredientAdded}
            // removed={this.removeIngredientHandler.bind(this)}
            removed={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.isPurchasable(this.props.ingredients)}
            ordered={this.purchaseHandler.bind(this)}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalDismissed={this.modalDismissedHandler.bind(this)} >

          {this.state.loading || !this.props.ingredients ? <Spinner /> : orderSummary}

          <p>Lorem, ipsum dolor.</p>
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredient) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient}),
    onIngredientRemoved: (ingredient) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios));