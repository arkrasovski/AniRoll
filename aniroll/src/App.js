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
    const itemInd = orders.findIndex(
      (item) => item.id === order.id && item.type === order.type
    );
    if (itemInd >= 0) {
      const itemInState = orders.find(
        (item) => item.id === order.id && item.type === order.type
      );
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

  removeFromOrders = (id, type) => {
    const index = orders.findIndex(
      (elem) => elem.id === id && elem.type === type
    );
    const before = orders.slice(0, index);
    const after = orders.slice(index + 1);
    orders = [...before, ...after];
    this.setState({ orders: orders });
  };

  addQTTY = (id, type) => {
    const itemInd = orders.findIndex(
      (item) => item.id === id && item.type === type
    );
    const itemInState = orders.find(
      (item) => item.id === id && item.type === type
    );
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
  };

  subQTTY = (id, type) => {
    const itemInd = orders.findIndex(
      (item) => item.id === id && item.type === type
    );
    const itemInState = orders.find(
      (item) => item.id === id && item.type === type
    );
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
  };

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
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewrolls"
              component={(props) => <CreateCardBox type={"rolls"} {...props} />}
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

            <Route
              path="/напитки"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get(
                      "http://localhost:3002/api/getdrinks"
                    );
                  }}
                  type={"drinks"}
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewdrinks"
              component={(props) => (
                <CreateCardBox type={"drinks"} {...props} />
              )}
            />
            <Route
              path="/drinks/:id/"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <ItemFull
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getdrinksFromId/${id}`
                      );
                    }}
                    addToOrders={this.addToOrders}
                  />
                );
              }}
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
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
