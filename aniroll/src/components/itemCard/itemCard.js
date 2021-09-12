import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemCard.sass";

export default class ItemCard extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ item });
  }

  render() {
    const { item } = this.state;
    console.log(item);
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, weight } = item;
    return (
      <div className="card">
        <img src={url} alt={type + " " + name} />
        <div className="titleCard">
          <span className="title">{name}</span>, {number} шт.
        </div>
        <div className="cardPrice">
          <span>{price} руб</span>
          <span>{weight} гр.</span>
        </div>
        <button>В корзину</button>
      </div>
    );
  }
}
