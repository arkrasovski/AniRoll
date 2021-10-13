import React, { Component } from "react";
import "./basketItem.sass";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";

export default class BasketItem extends Component {
  state = {
    item: null,
  };

  componentDidMount() {
    const { item } = this.props;
    this.setState({ item });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      const { item } = this.props;
      this.setState({ item });
    } //сравниваем совпадение предыдущих пропсов и текущих
  }

  render() {
    const { item } = this.state;
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, id, qtty } = item;
    const { removeFromOrders, addQTTY, subQTTY } = this.props;
    return (
      <div className="cardBasket">
        <div
          className="deleteBasket"
          onClick={() => {
            removeFromOrders(id, type);
          }}
        >
          <IoMdCloseCircle />
        </div>
        <div className="basketItem">
          <img src={url} alt="Изображение товара" />
          <div className="basketItemInfo">
            <span className="name">{name}</span>
            <span className="price">
              Стоимость: {Math.round(price * qtty * 100) / 100}
            </span>
            <span className="number">{number} шт</span>
          </div>
        </div>
        <div className="basketCounter">
          <AiOutlineMinusCircle
            onClick={() => {
              subQTTY(id, type);
            }}
          />
          <div className="counter">{qtty}</div>
          <AiOutlinePlusCircle
            onClick={() => {
              addQTTY(id, type);
            }}
          />
        </div>
      </div>
    );
  }
}
