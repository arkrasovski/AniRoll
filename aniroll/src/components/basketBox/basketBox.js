import React, { Component } from "react";
import "./basketBox.sass";
import { Link } from "react-router-dom";
import BasketItem from "../basketItem/basketItem";
import hhi from "../../images/hhi.jpg";

export default class BasketBox extends Component {
  state = {
    basketList: null,
    total: 0,
  };

  componentDidMount() {
    const { orders } = this.props;
    this.setState({ basketList: orders });
  }

  removeFromState = (id) => {
    const { basketList } = this.state;

    const index = basketList.findIndex((elem) => elem.id === id);
    const before = basketList.slice(0, index);
    const after = basketList.slice(index + 1);
    const newArray = [...before, ...after];
    this.setState({ basketList: newArray });
  };

  renderItems(arr) {
    const { addToOrders, removeFromOrders, addQTTY, subQTTY } = this.props;
    if (arr) {
      return arr.map((item) => {
        return (
          <BasketItem
            item={item}
            key={item.id + item.type[0]}
            removeFromOrders={removeFromOrders}
            addToOrders={addToOrders}
            addQTTY={addQTTY}
            subQTTY={subQTTY}
          ></BasketItem>
        );
      });
    }
  }

  fintTotal(arr) {
    let sum = 0;
    if (arr) {
      arr.forEach((item) => {
        sum += item.price * item.qtty;
      });
    }
    return sum;
  }

  render() {
    const { basketList } = this.state;
    let items = this.renderItems(basketList);
    let total = this.fintTotal(basketList);

    if (!basketList || basketList.length === 0) {
      return (
        <section className="mainBasket">
          <div className="emptyBasket">
            <span>Ваша корзина еще пуста ххи</span>
            <img src={hhi} alt="Хитрый хайповый извращенец" />
          </div>
        </section>
      );
    }

    return (
      <section className="mainBasket">
        <div className="total">{Math.round(total * 100) / 100} руб.</div>
        {items}

        <Link to="/finishOrder">
          <button className="checkout">Оформить заказ</button>
        </Link>
      </section>
    );
  }
}
