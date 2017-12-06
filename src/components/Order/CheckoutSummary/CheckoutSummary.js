import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button type="Danger" clicked={props.onCheckoutCancel}>Cancel</Button>
      <Button type="Success" clicked={props.onCheckoutContinue}>Continue</Button>

    </div>
  );
}

export default checkoutSummary;