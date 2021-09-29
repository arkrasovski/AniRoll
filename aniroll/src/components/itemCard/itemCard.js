import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemCard.sass";
import { ImCross } from "react-icons/im";
import { GrUpdate } from "react-icons/gr";
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

  render() {
    const { item } = this.state;
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, weight, id } = item;
    const { addToOrders } = this.props;
    return (
      <div className="card">
        <div
          className="deleteSign"
          onClick={() => {
            this.deletePost(id);
          }}
        >
          <ImCross />
        </div>
        <div className="updateSign">
          <Link to={`update${item.type}/${item.id}`}>
            <GrUpdate />
          </Link>
        </div>

        <Link to={"/" + type + "/" + id}>
          <img src={url} alt={type + " " + name} />
        </Link>
        <div className="titleCard">
          <span className="title">{name}</span>, {number} шт.
        </div>
        <div className="cardPrice">
          <span>{price} руб</span>
          <span>{weight} гр.</span>
        </div>
        <button
          onClick={() => {
            addToOrders(this.state.item);
          }}
        >
          В корзину
        </button>
      </div>
    );
  }
}
