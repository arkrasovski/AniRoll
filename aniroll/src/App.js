import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import CreateCardBox from "./components/createCardBox";
import BasketBox from "./components/basketBox";
import ItemFull from "./components/itemFull";
import FinishOrder from "./components/finishOrder";
import NoMatch from "./components/noMatch";
import Axios from "axios";
import "./App.css";
import "./fonts.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//let orders = [];
export default class App extends Component {
  state = {
    links: ["rolls", "sushi", "sets", "sauces", "drinks"],
    types: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            links={this.state.links}
            names={this.state.types}
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
              path="/rolls"
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
              path="/updaterolls/:id"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <CreateCardBox
                    type={"rolls"}
                    isUpdate={true}
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getrollsFromId/${id}`
                      );
                    }}
                  />
                );
              }}
            />

            <Route
              path="/rolls/:id"
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
              path="/drinks"
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
              path="/updatedrinks/:id"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <CreateCardBox
                    type={"drinks"}
                    isUpdate={true}
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getdrinksFromId/${id}`
                      );
                    }}
                  />
                );
              }}
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

            {/* суши */}
            <Route
              path="/sushi"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get(
                      "http://localhost:3002/api/getsushi"
                    );
                  }}
                  type={"sushi"}
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsushi"
              component={(props) => <CreateCardBox type={"sushi"} {...props} />}
            />

            <Route
              path="/updatesushi/:id"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <CreateCardBox
                    type={"sushi"}
                    isUpdate={true}
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsushiFromId/${id}`
                      );
                    }}
                  />
                );
              }}
            />

            <Route
              path="/sushi/:id/"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <ItemFull
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsushiFromId/${id}`
                      );
                    }}
                    addToOrders={this.addToOrders}
                  />
                );
              }}
            />

            {/* sets */}
            <Route
              path="/sets"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get("http://localhost:3002/api/getsets");
                  }}
                  type={"sets"}
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsets"
              component={(props) => <CreateCardBox type={"sets"} {...props} />}
            />

            <Route
              path="/updatesets/:id"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <CreateCardBox
                    type={"sets"}
                    isUpdate={true}
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsetsFromId/${id}`
                      );
                    }}
                  />
                );
              }}
            />

            <Route
              path="/sets/:id/"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <ItemFull
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsetsFromId/${id}`
                      );
                    }}
                    addToOrders={this.addToOrders}
                  />
                );
              }}
            />

            {/* sauces */}
            <Route
              path="/sauces"
              exact
              component={(props) => (
                <ItemBox
                  getData={async () => {
                    return await Axios.get(
                      "http://localhost:3002/api/getsauces"
                    );
                  }}
                  type={"sauces"}
                  addToOrders={this.addToOrders}
                  goFullItem={this.goFullItem}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsauces"
              component={(props) => (
                <CreateCardBox type={"sauces"} {...props} />
              )}
            />

            <Route
              path="/updatesauces/:id"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <CreateCardBox
                    type={"sauces"}
                    isUpdate={true}
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsaucesFromId/${id}`
                      );
                    }}
                  />
                );
              }}
            />

            <Route
              path="/sauces/:id/"
              render={({ match }) => {
                const { id } = match.params;
                return (
                  <ItemFull
                    getData={async () => {
                      return await Axios.get(
                        `http://localhost:3002/api/getsaucesFromId/${id}`
                      );
                    }}
                    addToOrders={this.addToOrders}
                  />
                );
              }}
            />

            <Route path="/basket" component={BasketBox} />

            <Route path="/finishOrder" component={FinishOrder} />

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>

          <Footer />
        </div>
      </Router>
    );
  }
}
