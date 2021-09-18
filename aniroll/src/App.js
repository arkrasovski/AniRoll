import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import CreateCardBox from "./components/createCardBox";
import BasketBox from "./components/basketBox";
import ItemFull from "./components/itemFull";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";
let orders = [];
export default class App extends Component {
  state = {
    links: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
    types: ["rolls", "sushi", "sets", "souses", "drinks"],
    orders: null,
  };

  updateOrders = () => {
    this.setState({ orders: orders });
  };

  addToOrders = (order, number = 1) => {
    const itemInd = orders.findIndex((item) => item.id === order.id);
    if (itemInd >= 0) {
      const itemInState = orders.find((item) => item.id === order.id);
      const newItem = {
        ...itemInState,
        qtty: itemInState.qtty + number,
      };

      orders = [
        ...orders.slice(0, itemInd),
        newItem,
        ...orders.slice(itemInd + 1),
      ];
    }
    // товара раньше не было в корзине
    else {
      const newItem = {
        name: order.name,
        price: order.price,
        url: order.url,
        weight: order.weight,
        id: order.id,
        number: order.number,
        type: order.type,
        qtty: number,
      };

      orders = [...orders, newItem];
    }
  };

  removeFromOrders = (id) => {
    const index = orders.findIndex((elem) => elem.id === id);
    const before = orders.slice(0, index);
    const after = orders.slice(index + 1);
    orders = [...before, ...after];
    this.setState({ orders: orders });
  };

  addQTTY = (id) => {
    const itemInd = orders.findIndex((item) => item.id === id);
    const itemInState = orders.find((item) => item.id === id);
    const newItem = {
      ...itemInState,
      qtty: ++itemInState.qtty,
    };

    orders = [
      ...orders.slice(0, itemInd),
      newItem,
      ...orders.slice(itemInd + 1),
    ];
    this.setState({ orders: orders });
    console.log("app", orders);
  };

  subQTTY = (id) => {
    const itemInd = orders.findIndex((item) => item.id === id);
    const itemInState = orders.find((item) => item.id === id);
    const newItem = {
      ...itemInState,
      qtty: --itemInState.qtty,
    };

    orders = [
      ...orders.slice(0, itemInd),
      newItem,
      ...orders.slice(itemInd + 1),
    ];
    this.setState({ orders: orders });
    console.log("app", orders);
  };

  // addToOrdersFromFullItem = (item, number) => {
  //   console.log("added!!!", number);
  //   this.addToOrders(item, number);
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            links={this.state.links}
            updateOrders={this.updateOrders}
          ></Header>
          <Switch>
            <Route
              path="/"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get(
                      "http://localhost:3002/api/getRolls"
                    );
                  }}
                  type={"rolls"}
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/роллы"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get(
                      "http://localhost:3002/api/getRolls"
                    );
                  }}
                  type={"rolls"}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewrolls"
              component={(props) => <CreateCardBox type={"rolls"} {...props} />}
            />

            <Route
              path="/basket"
              component={(props) => (
                <BasketBox
                  orders={orders}
                  removeFromOrders={this.removeFromOrders}
                  addQTTY={this.addQTTY}
                  subQTTY={this.subQTTY}
                  {...props}
                />
              )}
            />

            <Route
              path="/rolls/:id/"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <ItemFull
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getrollsFromId/${id}`
                      );
                    }}
                    addToOrders={this.addToOrders}
                  />
                );
              }}
            />
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
