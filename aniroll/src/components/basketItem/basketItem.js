import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./basketItem.sass";
import { ImCross } from "react-icons/im";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default class BasketItem extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ item });
  }

  render() {
    const { item } = this.state;
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, weight, id, qtty } = item;
    const { removeFromOrders, addQTTY, subQTTY } = this.props;
    return (
      <div className="cardBasket">
        <div
          className="deleteBasket"
          onClick={() => {
            removeFromOrders(id);
          }}
        >
          <ImCross />
        </div>
        <div className="basketItem">
          <img src={url} alt="Изображение товара" />
          <div className="basketItemInfo">
            <span className="name">{name}</span>
            <span className="price">Стоимость: {price * qtty}</span>
            <span className="number">{number} шт</span>
          </div>
        </div>
        <div className="basketCounter">
          <AiOutlineMinusCircle
            onClick={() => {
              if (qtty > 1) {
                subQTTY(id);
              }
            }}
          />
          <div className="counter">{qtty}</div>
          <AiOutlinePlusCircle
            onClick={() => {
              addQTTY(id);
            }}
          />
        </div>
      </div>
    );
  }
}
