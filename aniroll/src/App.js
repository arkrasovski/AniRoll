import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import CreateCardBox from "./components/createCardBox";
import BasketBox from "./components/basketBox";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";
let orders = [];
export default class App extends Component {
  state = {
    links: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
    types: ["rolls", "sushi", "sets", "souses", "drinks"],
  };

  addToOrders = (order) => {
    const itemInd = orders.findIndex((item) => item.id === order.id);
    if (itemInd >= 0) {
      const itemInState = orders.find((item) => item.id === order.id);
      const newItem = {
        ...itemInState,
        qtty: ++itemInState.qtty,
        kek: null,
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
        qtty: 1,
      };

      orders = [...orders, newItem];
    }
  };

  removeFromOrders = (id) => {
    const index = orders.findIndex((elem) => elem.id === id);
    const before = orders.slice(0, index);
    const after = orders.slice(index + 1);
    orders = [...before, ...after];
    this.setState({ kek: "lol" });
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
    this.setState({ kek: "lol" });
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
    this.setState({ kek: "lol" });
    console.log("app", orders);
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header links={this.state.links}></Header>
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
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
