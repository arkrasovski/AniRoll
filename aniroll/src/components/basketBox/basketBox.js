import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./basketBox.sass";
import BasketItem from "../basketItem/basketItem";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class BasketBox extends Component {
  state = {
    basketList: null,
  };

  // deleteItem = (id) => {
  //   this.setState(({ itemList }) => {
  //     const index = itemList.findIndex((elem) => elem.id === id);
  //     const before = itemList.slice(0, index);
  //     const after = itemList.slice(index + 1);
  //     const newArray = [...before, ...after];

  //     return { itemList: newArray };
  //   });
  // };

  componentDidMount() {
    const { orders } = this.props;
    this.setState({ basketList: orders });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.orders !== prevProps.orders) {
  //     const { orders } = this.props;
  //     this.setState({ basketList: orders });
  //   } //сравниваем совпадение предыдущих пропсов и текущих
  // }

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
            key={item.id}
            removeFromOrders={removeFromOrders}
            addToOrders={addToOrders}
            addQTTY={addQTTY}
            subQTTY={subQTTY}
          ></BasketItem>
        );
      });
    }
  }

  render() {
    const { basketList } = this.state;
    let items = this.renderItems(basketList);
    return <section className="main">{items}</section>;
  }
}
