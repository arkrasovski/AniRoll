import React, { Component } from "react";
import "./finishOrder.sass";
import { Link } from "react-router-dom";
import Axios from "axios";

export default class FinishOrder extends Component {
  state = {
    orders: null,
    name: "",
    telNum: "",
    address: "",
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
    });
  };

  render() {
    const { clearOrder } = this.props;
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

            <Link to="/">
              <button
                onClick={() => {
                  this.submitCard();
                  clearOrder();
                }}
              >
                Отправить заказ
              </button>
            </Link>
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
