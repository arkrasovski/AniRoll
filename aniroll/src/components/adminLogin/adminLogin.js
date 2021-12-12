import React, { Component } from "react";
import Modal from "../modal";
import "./adminLogin.sass";
import { Redirect } from "react-router";

//тут если перезагрузить, автозаполнение не подхватит изменения в формах

export default class AdminLogin extends Component {
  state = {
    login: "",
    password: "",

    modalActive: false,
    modalText: "",
    validateTrue: false,

    loginDirty: false,
    passwordDirty: false,

    loginError: "Логин не может быть пустым",
    passwordError: "Пароль не может быть пустым",

    formValid: false,

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
      localStorage.setItem("isAdmin", true);
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

  leave = (e) => {
    e.preventDefault();
    this.setState({
      modalActive: true,
      modalText: "Вы успешно вышли",
      validateTrue: true,
    });
    localStorage.removeItem("isAdmin");
  };

  setModalActiveAdmin = () => {
    this.setState({ modalActive: false, Redirect: true });

  };

  setModalActive = () => {
    this.setState({
      modalActive: false,
      formValid: false,
      loginError: "Логин не может быть пустым",
      passwordError: "Пароль не может быть пустым",
      loginDirty: false,
      passwordDirty: false,
    });
  };

  blurHandler = (e) => {
    const name = e.target.name + "Dirty";
    this.setState({ [name]: true });
    if (e.target.value === "") {
      e.target.classList.add("empty");
    }
  };

  inputHandler = (e) => {
    e.target.classList.remove("empty");
    const name = e.target.name;
    const nameError = name + "Error";

    
    this.setState({ [name]: e.target.value });
    if (e.target.value === "") {
      e.target.classList.add("empty");
      this.setState(
        { [nameError]: "Поле должно быть заполнено" },
        this.validateForm
      );
    } else {
      this.setState({ [nameError]: "" }, this.validateForm);
    }
  };

  validateForm = () => {
    this.setState({
      formValid: !this.state.loginError && !this.state.passwordError,
    });
  };

  render() {
    console.log("apchi", this.state.login, this.state.password, this.state.formValid, this.state.loginDirty)
    if (this.state.Redirect) {
      return <Redirect push to="/" />;
    }
    if (!localStorage.getItem("isAdmin")) {
      return (
        <section className="mainAdmin">
          <span className="title">Введите логин и пароль</span>
          <form>
            <div>
              {this.state.loginDirty && this.state.loginError && (
                <span className="validateError">{this.state.loginError}</span>
              )}
              <input
                autoComplete="off"
                type="text"
                name="login"
                placeholder="Логин"
                onBlur={this.blurHandler}
                onChange={this.inputHandler}
              />
            </div>
            <div>
              {this.state.passwordDirty && this.state.passwordError && (
                <span className="validateError">
                  {this.state.passwordError}
                </span>
              )}
              <input
                autoComplete="off"
                type="password"
                name="password"
                placeholder="Пароль"
                onBlur={this.blurHandler}
                onChange={this.inputHandler}
              />
            </div>
            <button

              disabled={!this.state.formValid}
              type="submit"
              onClick={this.enter}
            >
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
          <form>
          <button type="submit" onClick={this.leave}>
            Выйти
          </button>
          </form>
          
          <Modal
            active={this.state.modalActive}
            setActive={this.setModalActiveAdmin}
            content={this.state.modalText}
          />
        </section>
      );
    }
  }
}
