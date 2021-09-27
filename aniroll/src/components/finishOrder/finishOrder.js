import React, { Component } from "react";
import { Redirect } from "react-router";
import "./finishOrder.sass";
import Axios from "axios";

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
      formValid: !this.state.nameError && !this.state.addressError,
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
            <input
              required
              //id="online_phone"
              //autoFocus="autofocus"
              //value="+375(__)___-__-__"
              //pattern="\+375\s?[\(]{0,1}9[0-9]{1}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
              //placeholder="+375(__)___-__-__"
              type="text"
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ telNum: e.target.value });
                // function setCursorPosition(pos, e) {
                //   e.focus();
                //   if (e.setSelectionRange) e.setSelectionRange(pos, pos);
                //   else if (e.createTextRange) {
                //     var range = e.createTextRange();
                //     range.collapse(true);
                //     range.moveEnd("character", pos);
                //     range.moveStart("character", pos);
                //     range.select();
                //   }
                // }
                // function mask(e) {
                //   console.log("clicked!");
                //   var matrix = this.placeholder, // .defaultValue
                //     i = 0,
                //     def = matrix.replace(/\D/g, ""),
                //     val = this.value.replace(/\D/g, "");
                //   def.length >= val.length && (val = def);
                //   matrix = matrix.replace(/[_\d]/g, function (a) {
                //     return val.charAt(i++) || "_";
                //   });
                //   this.value = matrix;
                //   i = matrix.lastIndexOf(val.substr(-1));
                //   i < matrix.length && matrix !== this.placeholder
                //     ? i++
                //     : (i = matrix.indexOf("_"));
                //   setCursorPosition(i, this);
                // }
                // //var input = document.querySelector("#online_phone");
                // e.target.addEventListener("input", mask, false);
                // e.target.focus();
                // setCursorPosition(3, e.target);
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
