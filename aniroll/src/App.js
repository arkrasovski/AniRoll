import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ItemBox from "./components/itemBox";
import Axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";

export default class App extends Component {
  state = {
    links: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header links={this.state.links}></Header>
          <ItemBox
            getData={async () => {
              return await Axios.get("http://localhost:3002/api/getRolls");
            }}
          ></ItemBox>
          <Footer />
        </div>
      </Router>
    );
  }
}
