import React, { Component } from "react";
import Aux from './../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../UI/Navigation/Toolbar/Toolbar';
import SideDrawer from '../UI/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showSideDrawer: false
    }

    this.sideDrawerClosedHandler = this.sideDrawerClosedHandler.bind(this)
    this.drawerToggleClickedHandler = this.drawerToggleClickedHandler.bind(this)
  }

  sideDrawerClosedHandler() {
    this.setState({ showSideDrawer: false });
  }

  drawerToggleClickedHandler() {
    this.setState((prev, props) => {
      return {
        showSideDrawer: ! prev.showSideDrawer
      }
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={this.drawerToggleClickedHandler} />
        <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />

        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
};

export default Layout;