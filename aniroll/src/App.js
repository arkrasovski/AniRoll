import React, { Component } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { useLocation } from "react-router";
import logo from "./logo.svg";

export default class App extends Component {
  state = {
    links: ["Роллы", "Суши", "Сеты", "Соусы", "Напитки"],
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header links={this.state.links}></Header>
          <section></section>
          <Footer />
        </div>
      </Router>
    );
  }
}
// лул
