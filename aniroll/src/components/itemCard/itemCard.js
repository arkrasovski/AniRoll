import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemCard.sass";
import Axios from "axios";

export default class ItemCard extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ item });
  }

  deletePost = (id) => {
    Axios.delete(
      `http://localhost:3002/api/delete${this.state.item.type}/${id}`
    )
      .then((response) => {
        this.props.onDelete(this.state.item.id);

        this.props.getResponse(true);
        console.log("ok", response);
      })
      .catch((error) => {
        this.props.getResponse(false);
        console.log("ne ok", error);
      });
  };

  localAddToOrders = (order, number = 1) => {
    if (localStorage.getItem("orders")) {
      let orders = JSON.parse(localStorage.getItem("orders"));
      const itemInd = orders.findIndex(
        (item) => item.id === order.id && item.type === order.type
      );
      if (itemInd >= 0) {
        const itemInState = orders.find(
          (item) => item.id === order.id && item.type === order.type
        );
        const newItem = {
          ...itemInState,
          qtty: itemInState.qtty + number,
        };

        orders = [
          ...orders.slice(0, itemInd),
          newItem,
          ...orders.slice(itemInd + 1),
        ];
        localStorage.setItem("orders", JSON.stringify(orders));
      }
      // товара раньше не было в корзине
      else {
        const newItem = {
          name: order.name,
          price: order.price,
          url: order.url,
          weight: order.weight,
          id: order.id,
          number: order.number,
          type: order.type,
          qtty: number,
        };

        orders = [...orders, newItem];
        localStorage.setItem("orders", JSON.stringify(orders));
      }
    } else {
      const newItem = {
        name: order.name,
        price: order.price,
        url: order.url,
        weight: order.weight,
        id: order.id,
        number: order.number,
        type: order.type,
        qtty: number,
      };
      localStorage.setItem("orders", JSON.stringify([newItem]));
    }
  };

  render() {
    const { item } = this.state;
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, weight, measure, id } = item;
    return (
      <div className="card">
        <Link to={"/" + type + "/" + id}>
          <img src={url} alt={type + " " + name} />
        </Link>
        <div className="titleCard">
          <span className="title">{name}</span>, {number} шт.
        </div>
        <div className="cardPrice">
          <span>{price} руб</span>
          <span>
            {weight} {measure}.
          </span>
        </div>
        <button
          onClick={() => {
            this.localAddToOrders(this.state.item);
          }}
        >
          В корзину
        </button>
      </div>
    );
  }
}
