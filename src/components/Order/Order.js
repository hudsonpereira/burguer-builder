import React from 'react';

import classes from './Order.css';

const order = props => {
  const ingredients = [];

  for (const key in props.ingredients) {
    if (props.ingredients.hasOwnProperty(key)) {
      const element = props.ingredients[key];

      ingredients.push({
        name: key,
        amount: element
      });
    }
  }

  const mappedIngredients = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >{ingredient.name} ({ingredient.amount}) </span>
    );
  })

  return (
    <div className={classes.Order}>
      <p>Ingredients: {mappedIngredients}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
}

export default order;