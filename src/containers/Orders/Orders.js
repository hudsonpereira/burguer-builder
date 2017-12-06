import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    axios.get('orders.json')
      .then(response => {
        const orders = [];

        for (const key in response.data) {
          if (response.data.hasOwnProperty(key)) {
            const element = response.data[key];

            orders.push({
              ...element,
              id: key
            })
          }
        }
        this.setState({orders});
      })
  }

  render() {
    const orders = this.state.orders.map(order => {
      return <Order key={order.id} {...order} />
    })
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default Orders;