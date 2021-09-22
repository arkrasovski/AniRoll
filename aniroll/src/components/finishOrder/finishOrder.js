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
  };

  componentDidMount() {
    const { orders } = this.props;
    this.setState({ orders });
  }

  submitCard = () => {
    const inputs = document.querySelectorAll("input[required]");

    inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("empty");
      }
    });

    if (
      this.state.name !== "" &&
      this.state.address !== "" &&
      this.state.telNum !== ""
    ) {
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
        .then(this.test()) //сюда можно передавать функции
        .catch((err) => console.log(err));
    }

    inputs.forEach((input) => {
      input.value = "";
    });
  };

  test = () => {
    this.setState({ Redirect: true });
  };

  render() {
    if (this.state.Redirect) {
      this.props.clearOrder();
      console.log("redirect");
      return <Redirect push to="/" />;
    }
    if (this.state.orders) {
      return (
        <section className="main">
          <div className="uploadPost">
            <label>Ваше ФИО: </label>
            <input
              required
              type="text"
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ name: e.target.value });
              }}
            />
            <label>Номер телефона: </label>
            <input
              required
              type="text"
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ telNum: e.target.value });
              }}
            />
            <label>Адрес: </label>
            <input
              required
              type="text"
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ address: e.target.value });
              }}
            />

            <button onClick={this.submitCard}>Submit Post</button>
          </div>
        </section>
      );
    }
    return (
      <section className="main">
        Ваша корзина пуста, сделайте сначала заказ
      </section>
    );
  }
}
