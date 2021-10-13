import React, { Component } from "react";
import "./itemFull.sass";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import NoMatch from "../noMatch";

export default class ItemFull extends Component {
  state = {
    item: null,
    loading: true,
    error: false,
    number: 1,
  };

  componentDidMount() {
    const { getData } = this.props;
    getData()
      .then((item) => {
        this.setState({
          item: item.data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          item: null,
          error: true,
          loading: false,
        });
      });
  }

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
    if (!this.state.item && this.state.error) {
      return (
        <section className="spinnerBox">
          <ErrorMessage />;{" "}
        </section>
      );
    }

    if (this.state.loading) {
      return (
        <section className="spinnerBox">
          <Spinner />
        </section>
      );
    }

    const { item } = this.state;

    if (!this.state.item || this.state.item.length === 0) {
      return <NoMatch />;
    }
    if (this.state.item) {
      const { name, url, number, price, description } = item[0];
      const { addToOrders } = this.props;
      return (
        <section className="FullItemMain">
          <div className="fullItem">
            <div className="fullItemInfo">
              <img src={url} alt="Изображение товара" />
              <div className="fullItemText">
                <span className="name">{name}</span>
                <span className="price">
                  Стоимость: {Math.round(price * this.state.number * 100) / 100}
                </span>
                <span className="number">{number} шт</span>
              </div>
              <div className="description">{description}</div>
            </div>

            <div className="fullItemCounter">
              <AiOutlineMinusCircle
                onClick={() => {
                  let number = this.state.number;
                  if (number > 1) {
                    this.setState({ number: --number });
                  }
                }}
              />
              <div className="counter">{this.state.number}</div>
              <AiOutlinePlusCircle
                onClick={() => {
                  let number = this.state.number;
                  this.setState({ number: ++number });
                }}
              />
            </div>
          </div>

          <button
            className="toBasketFullItem"
            onClick={() => {
              this.localAddToOrders(item[0], this.state.number);
              //addToOrders(item[0], this.state.number);
            }}
          >
            В корзину
          </button>
        </section>
      );
    }
  }
}
