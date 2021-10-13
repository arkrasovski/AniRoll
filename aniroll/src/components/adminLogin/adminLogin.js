import React, { Component } from "react";
import Modal from "../modal";
import "./adminLogin.sass";
import { Redirect } from "react-router";

export default class AdminLogin extends Component {
  state = {
    login: "",
    password: "",

    modalActive: false,
    modalText: "",
    validateTrue: false,

    Redirect: false,

    trueLogin: "admin",
    truePassword: "admin",
  };

  enter = (e) => {
    e.preventDefault();
    if (
      this.state.login === this.state.trueLogin &&
      this.state.password === this.state.truePassword
    ) {
      this.setState({
        modalActive: true,
        modalText: "Вы успешно зашли",
        validateTrue: true,
      });
    } else {
      const inputs = document.querySelectorAll("input");
      inputs.forEach((input) => {
        input.value = "";
      });

      this.setState({
        login: "",
        password: "",
        modalActive: true,
        modalText: "Введен неправильный логин или пароль",
      });
    }
  };

  leave = () => {
    this.setState({
      modalActive: true,
      modalText: "Вы успешно вышли",
      validateTrue: false,
    });
  };

  setModalActiveAdmin = () => {
    //console.log("clicked");
    this.setState({ modalActive: false, Redirect: true });
    localStorage.setItem("isAdmin", true);
  };

  setModalActiveNoAdmin = () => {
    //console.log("clicked");
    this.setState({ modalActive: false, Redirect: true });
    localStorage.removeItem("isAdmin");
  };

  setModalActive = () => {
    this.setState({ modalActive: false });
  };

  render() {
    console.log(this.state.Redirect);

    if (this.state.Redirect) {
      return <Redirect push to="/" />;
    }
    if (!localStorage.getItem("isAdmin")) {
      return (
        <section className="mainAdmin">
          <span className="title">Введите логин и пароль</span>
          <form>
            <input
              type="text"
              placeholder="Логин"
              onChange={(e) => {
                this.setState({ login: e.target.value });
              }}
            />
            <input
              type="password"
              placeholder="Пароль"
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
            <button type="submit" onClick={this.enter}>
              Войти
            </button>
          </form>
          <Modal
            active={this.state.modalActive}
            setActive={() => {
              if (this.state.validateTrue) {
                this.setModalActiveAdmin();
              } else {
                this.setModalActive();
              }
            }}
            content={this.state.modalText}
          />
        </section>
      );
    } else {
      return (
        <section className="mainAdmin">
          <span className="title">Выйти из режима администратора</span>
          <button type="submit" onClick={this.leave}>
            Выйти
          </button>
          <Modal
            active={this.state.modalActive}
            setActive={this.setModalActiveNoAdmin}
            content={this.state.modalText}
          />
        </section>
      );
    }
  }
}
