import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="">
        <Layout>
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Switch>

          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est voluptates quisquam quos cupiditate saepe molestias voluptas ullam obcaecati inventore? Autem amet nam voluptatum iusto perspiciatis enim aliquam magni expedita sapiente, recusandae explicabo quae quaerat quam. Expedita qui repellat sint, maxime reiciendis accusamus accusantium! Minima autem provident assumenda! Tenetur soluta molestiae voluptate consectetur, blanditiis velit deleniti, odio dignissimos voluptatum repudiandae fugiat natus ipsam delectus aperiam illo! Minima repellat adipisci libero voluptate eveniet inventore consectetur commodi necessitatibus perferendis iusto, quisquam, sapiente eius voluptas esse laboriosam illo consequatur dicta officiis quaerat officia? At quam, molestias deleniti sequi quo ducimus ea minus reprehenderit consectetur.</p>
        </Layout>
      </div>
    );
  }
}

export default App;
