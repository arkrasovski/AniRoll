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
import GoodsService from "./services/goodsService";
import "./App.css";
import "./fonts.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends Component {
  state = {
    links: ["rolls", "sushi", "sets", "sauces", "drinks"],
    types: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
    error: false,
  };

  GoodsService = new GoodsService();

  componentDidMount() {
    
    let date = new Date();
    let localStorageEndTime = localStorage.getItem("localStorageEndTime");
    if (localStorageEndTime === null) {
      localStorage.setItem(
        "localStorageEndTime",
        +new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1, 0)
      );
    } else if (+new Date() > localStorageEndTime) {
      localStorage.removeItem("orders");
      localStorage.setItem(
        "localStorageEndTime",
        +new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1, 1, 0)
      );
    }
  }

  componentDidCatch() {
    this.setState({ error: true });
  }

  render() {
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
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewrolls"
              component={(props) => (
                <CreateCardBox
                  type={"rolls"}
                  postData={this.GoodsService.postGood}
                  {...props}
                />
              )}
            />

            <Route
              path="/updaterolls/:id"
              component={(props) => (
                <CreateCardBox
                  type={"rolls"}
                  isUpdate={true}
                  changeData={this.GoodsService.changeGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/rolls/:id"
              component={(props) => (
                <ItemFull
                  type={"rolls"}
                  deleteData={this.GoodsService.deleteGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sushi"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"sushi"}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsushi"
              component={(props) => (
                <CreateCardBox
                  type={"sushi"}
                  postData={this.GoodsService.postGood}
                  {...props}
                />
              )}
            />

            <Route
              path="/updatesushi/:id"
              component={(props) => (
                <CreateCardBox
                  type={"sushi"}
                  isUpdate={true}
                  changeData={this.GoodsService.changeGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sushi/:id"
              component={(props) => (
                <ItemFull
                  type={"sushi"}
                  deleteData={this.GoodsService.deleteGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sets"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"sets"}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsets"
              component={(props) => (
                <CreateCardBox
                  type={"sets"}
                  postData={this.GoodsService.postGood}
                  {...props}
                />
              )}
            />

            <Route
              path="/updatesets/:id"
              component={(props) => (
                <CreateCardBox
                  type={"sets"}
                  isUpdate={true}
                  changeData={this.GoodsService.changeGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sets/:id"
              component={(props) => (
                <ItemFull
                  type={"sets"}
                  deleteData={this.GoodsService.deleteGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sauces"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"sauces"}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewsauces"
              component={(props) => (
                <CreateCardBox
                  type={"sauces"}
                  postData={this.GoodsService.postGood}
                  {...props}
                />
              )}
            />

            <Route
              path="/updatesauces/:id"
              component={(props) => (
                <CreateCardBox
                  type={"sauces"}
                  isUpdate={true}
                  changeData={this.GoodsService.changeGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/sauces/:id"
              component={(props) => (
                <ItemFull
                  type={"sauces"}
                  deleteData={this.GoodsService.deleteGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/drinks"
              exact
              component={(props) => (
                <ItemBox
                  getData={this.GoodsService.getGoods}
                  type={"drinks"}
                  {...props}
                />
              )}
            />

            <Route
              path="/createnewdrinks"
              component={(props) => (
                <CreateCardBox
                  type={"drinks"}
                  postData={this.GoodsService.postGood}
                  {...props}
                />
              )}
            />

            <Route
              path="/updatedrinks/:id"
              component={(props) => (
                <CreateCardBox
                  type={"drinks"}
                  isUpdate={true}
                  changeData={this.GoodsService.changeGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route
              path="/drinks/:id"
              component={(props) => (
                <ItemFull
                  type={"drinks"}
                  deleteData={this.GoodsService.deleteGood}
                  getData={this.GoodsService.getGoodFromId}
                  {...props}
                />
              )}
            />

            <Route path="/basket" component={BasketBox} />

            <Route
              path="/finishOrder"
              component={(props) => (
                <FinishOrder
                  postOrder={this.GoodsService.postOrder}
                  getLastOrder={this.GoodsService.getLastOrder}
                  {...props}
                />
              )}
            />

            <Route
              path="/adminlogin"
              component={AdminLogin}
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
