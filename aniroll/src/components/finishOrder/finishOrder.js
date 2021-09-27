import React, { Component } from "react";
import { Redirect } from "react-router";
import "./finishOrder.sass";
import Axios from "axios";
import MaskedInput from "react-input-mask";

export default class ItemBox extends Component {
  state = {
    orders: null,
    name: "",
    telNum: "",
    address: "",
    Redirect: false,

    nameDirty: false,
    telNumDirty: false,
    addressDirty: false,

    nameError: "Имя не может быть пустым",
    telNumError: "Номер телефона не может быть пустым",
    addressError: "Адрес не может быть пустым",

    formValid: false,
  };

  componentDidMount() {
    const { orders } = this.props;
    this.setState({ orders });
  }

  submitCard = () => {
    // const inputs = document.querySelectorAll("input[required]");

    // inputs.forEach((input) => {
    //   if (!input.value) {
    //     input.classList.add("empty");
    //   }
    // });

    const { orders } = this.state;
    let orderText = "";
    orders.forEach((order) => {
      orderText += order.name + " x" + order.qtty + " ";
    });

    Axios.post(`http://localhost:3002/api/addOrder`, {
      name: this.state.name,
      address: this.state.address,
      telNumber: this.state.telNum,
      orderText,
    })
      .then(this.postIsNormal()) //сюда можно передавать функции
      .catch((err) => console.log(err));

    // inputs.forEach((input) => {
    //   input.value = "";
    // });
  };

  postIsNormal = () => {
    this.setState({ Redirect: true }, () => {
      this.props.clearOrder();
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

    this.setState({ [name]: e.target.value }, this.validateForm);
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
      formValid:
        !this.state.nameError &&
        !this.state.addressError &&
        !this.state.telNumError,
    });
  };

  render() {
    if (this.state.Redirect) {
      console.log("redirect");
      return <Redirect push to="/" />;
    }
    if (this.state.orders) {
      return (
        <section className="main">
          <div className="uploadPost">
            <label>Ваше ФИО: </label>
            {this.state.nameDirty && this.state.nameError && (
              <div style={{ color: "red" }}>{this.state.nameError}</div>
            )}
            <input
              required
              name="name"
              type="text"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                this.inputHandler(e);
              }}
            />
            <label>Номер телефона: </label>

            {this.state.telNumDirty && this.state.telNumError && (
              <div style={{ color: "red" }}>{this.state.telNumError}</div>
            )}
            <MaskedInput
              mask={"+375 (99) 999-99-99"}
              onChange={(e) => {
                this.setState({ telNumDirty: true });
                e.target.classList.remove("empty");
                console.log(e.target.value.slice(-1));
                this.setState({ telNum: e.target.value }, this.validateForm);
                if (
                  e.target.value === "+375 (__) ___-__-__" ||
                  e.target.value.slice(-1) === "_"
                ) {
                  e.target.classList.add("empty");
                  console.log("dasawrr");
                  this.setState(
                    { telNumError: "Поле должно быть заполнено" },
                    this.validateForm
                  );
                } else {
                  this.setState({ telNumError: "" }, this.validateForm);
                }
              }}
            />
            <label>Адрес: </label>
            {this.state.addressDirty && this.state.addressError && (
              <div style={{ color: "red" }}>{this.state.addressError}</div>
            )}
            <input
              required
              name="address"
              type="text"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                this.inputHandler(e);
              }}
            />

            <button
              className={this.state.formValid + "Disable"}
              disabled={!this.state.formValid}
              onClick={this.submitCard}
            >
              Submit Post
            </button>
          </div>
        </section>
      );
    }
    if (!this.state.orders) {
      return (
        <section className="main">
          Ваша корзина пуста, сделайте сначала заказ
        </section>
      );
    }
  }
}
