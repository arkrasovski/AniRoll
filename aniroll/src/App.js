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

let orders = [];
export default class App extends Component {
  state = {
    links: ["rolls", "sushi", "sets", "sauces", "drinks"],
    types: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
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

  clearOrder = () => {
    orders.length = 0;
    this.setState({ orders });
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
              path="/finishOrder"
              component={(props) => (
                <FinishOrder
                  orders={this.state.orders}
                  clearOrder={this.clearOrder}
                  {...props}
                />
              )}
            />

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

// function NoMatch() {
//   let location = useLocation();

//   return (
//     <section className="main">
//       <div className="errorBox">
//         <img src={rem} alt="Бессмер из аниме бессмертный " />
//         <span className="errorText">
//           No match for <code>{location.pathname}</code>
//         </span>
//       </div>
//     </section>
//   );
// }
