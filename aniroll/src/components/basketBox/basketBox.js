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
    // const { orders } = this.props;
    // this.setState({ basketList: orders });
    this.setState({ basketList: JSON.parse(localStorage.getItem("orders")) });
  }

  // removeFromState = (id) => {
  //   const { basketList } = this.state;

  //   const index = basketList.findIndex((elem) => elem.id === id);
  //   const before = basketList.slice(0, index);
  //   const after = basketList.slice(index + 1);
  //   const newArray = [...before, ...after];
  //   this.setState({ basketList: newArray });
  // };

  renderItems(arr) {
    if (arr) {
      return arr.map((item) => {
        console.log("pererisovka");
        console.log(item);
        return (
          <BasketItem
            item={item}
            key={item.id + item.type[0] + item.type[1]}
            removeFromOrders={this.removeFromOrders}
            addQTTY={this.addQTTY}
            subQTTY={this.subQTTY}
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

  removeFromOrders = (id, type) => {
    let orders = this.state.basketList;
    const index = orders.findIndex(
      (elem) => elem.id === id && elem.type === type
    );
    const before = orders.slice(0, index);
    const after = orders.slice(index + 1);
    orders = [...before, ...after];
    this.setState({ basketList: orders });
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  addQTTY = (id, type) => {
    let orders = this.state.basketList;
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
    this.setState({ basketList: orders });
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  subQTTY = (id, type) => {
    let orders = this.state.basketList;
    const itemInd = orders.findIndex(
      (item) => item.id === id && item.type === type
    );
    const itemInState = orders.find(
      (item) => item.id === id && item.type === type
    );
    if (itemInState.qtty > 1) {
      const newItem = {
        ...itemInState,
        qtty: --itemInState.qtty,
      };

      orders = [
        ...orders.slice(0, itemInd),
        newItem,
        ...orders.slice(itemInd + 1),
      ];
      this.setState({ basketList: orders });
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  };

  render() {
    console.log("basketList", this.state.basketList);
    const { basketList } = this.state;
    console.log("list", basketList);
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
