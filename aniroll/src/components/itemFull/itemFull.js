import React, { Component } from "react";
import "./itemFull.sass";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import NoMatch from "../noMatch";
import { ImCross } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import Modal from "../modal";
import { Redirect, withRouter } from "react-router";

class ItemFull extends Component {
  state = {
    item: null,
    loading: true,
    error: false,
    number: 1,

    redirect: false,

    modalActive: false,
    modalText: "",
  };

  componentDidMount() {
    const { getData, type } = this.props;

    const id = this.props.match.params.id;
    getData(type, id)
      .then((item) => {
        this.setState({
          item: item.data[0],
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

  deleteItem = () => {
    const { type, id } = this.state.item;
    const { deleteData } = this.props;
    this.setState({ loading: true });
    deleteData(type, id)
      .then((response) => {
        this.setState({
          // loading: false,
          modalActive: true,
          modalText: "Товар успешно удалён!",
        });
        //this.setModalActive(true);
        console.log("ok", response);
      })
      .catch((error) => {
        this.setState({
          //loading: false,
          modalActive: true,
          modalText: "Извините, не получилось удалить товар",
        });
        //this.setModalActive(false);
        console.log("ne ok", error);
      });
  };

  // setModalActive = (isOk) => {
  //   if (isOk) {
  //     this.setState({
  //       modalActive: true,
  //       modalText: "Товар успешно удалён!",
  //     });
  //   } else {
  //     this.setState({
  //       modalActive: true,
  //       modalText: "Извините, не получилось удалить товар",
  //     });
  //   }
  // };

  setModalUnActive = () => {
    this.setState({ modalActive: false, redirect: true });
    //window.location.reload();
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={this.props.type === "rolls" ? "/" : `/${this.props.type}`}
        />
      );
    }

    if (this.state.loading) {
      return (
        <section className="spinnerBox">
          {this.state.modalActive ? null : <Spinner />}
          <Modal
            active={this.state.modalActive}
            setActive={this.setModalUnActive}
            content={this.state.modalText}
          />
        </section>
      );
    }

    if (!this.state.item && this.state.error) {
      return (
        <section className="spinnerBox">
          <ErrorMessage />
        </section>
      );
    }

    const { item } = this.state;

    if (this.state.item) {
      const { name, url, number, price, weight, measure, description } = item;
      return (
        <section className="FullItemMain">
          <div className="fullItem">
            {localStorage.getItem("isAdmin") ? (
              <>
 
                  <ImCross className="deleteSign" onClick={() => {
                    this.deleteItem();
                  }}/>
         
                
                  <Link className="updateSign" to={`/update${item.type}/${item.id}`}>
                    <GrUpdate />
                  </Link>
                
              </>
            ) : null}
            <div className="fullItemInfo">
              <img src={url} alt="Изображение товара" />
              <div className="fullItemText">
                <span className="name">{name}</span>
                <span className="price">
                  Стоимость:{" "}
                  {Number.isInteger(
                    Math.round(price * this.state.number * 100) / 100
                  )
                    ? Math.round(price * this.state.number * 100) / 100
                    : Math.round(price * this.state.number * 100) % 10 === 0
                    ? Math.round(price * this.state.number * 100) / 100 + "0"
                    : Math.round(price * this.state.number * 100) / 100}
                  {/* {Math.round(price * this.state.number * 100) / 100} */}
                </span>
                <span className="weight">
                  {Math.round(weight * this.state.number * 1000) / 1000} {measure}
                  .
                </span>
                <span className="number">{number * this.state.number} шт</span>
              </div>
              {description === "" ? null : (
                <div className="description">{description}</div>
              )}
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
              this.localAddToOrders(item, this.state.number);
            }}
          >
            В корзину
          </button>
          {/* <Modal
            active={this.state.modalActive}
            setActive={this.setModalUnActive}
            content={this.state.modalText}
          /> */}
        </section>
      );
    }

    if (!item || item.length === 0) {
      return <NoMatch />;
    }
  }
}
export default withRouter(ItemFull);
