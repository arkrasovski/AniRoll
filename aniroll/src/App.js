import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import CreateCardBox from "./components/createCardBox";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";

export default class App extends Component {
  state = {
    links: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
    types: ["rolls", "sushi", "sets", "souses", "drinks"],
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
          </Switch>

          {/* <ItemBox
            getData={async () => {
              return await Axios.get("http://localhost:3002/api/getRolls");
            }}
          ></ItemBox> */}
          <Footer />
        </div>
      </Router>
    );
  }
}
