import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import CreateCardBox from "./components/createCardBox";
import BasketBox from "./components/basketBox";
import ItemFull from "./components/itemFull";
import FinishOrder from "./components/finishOrder";
import AdminLogin from "./components/adminLogin";
import NoMatch from "./components/noMatch";
import Gallery from "./components/gallery";
import ErrorMessage from "./components/errorMessage";
import Axios from "axios";
import GoodsService from "./services/goodsService";
import "./App.css";
import "./fonts.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//let orders = [];
export default class App extends Component {
  state = {
    links: ["rolls", "sushi", "sets", "sauces", "drinks"],
    types: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
    error: false,
  };

  GoodsService = new GoodsService();

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
    console.log(this.GoodsService.getGoods);
    if (this.state.error) {
      return (
        <section className="main">
          <ErrorMessage />;
        </section>
      );
    }
    return (
      <Router>
        <div className="App">
          <Header links={this.state.links} names={this.state.types}></Header>
          <Switch>
            <Route
              path="/"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"rolls"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
                  {...props}
                />
              )}
            />

            <Route
              path="/rolls"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"rolls"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
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
                  getData={this.GoodsService.getGoods}
                  type={"drinks"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
                  litres={true}
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
                  getData={this.GoodsService.getGoods}
                  type={"sushi"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
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
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"sets"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
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
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"sauces"}
                  goFullItem={this.goFullItem}
                  isAdmin={this.state.isAdmin}
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

            <Route
              path="/adminlogin"
              component={(props) => (
                <AdminLogin
                  setAdmin={this.setAdmin}
                  isAdmin={this.state.isAdmin}
                  {...props}
                />
              )}
            />

            <Route path="/gallery" component={Gallery} />

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
