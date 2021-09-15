import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemCard.sass";
import { ImCross } from "react-icons/im";
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
    ).then((response) => {
      alert("you deleted a post");
    });
    window.location.reload(); //перезагрузка страницы
  };

  render() {
    const { item } = this.state;
    if (!this.state.item) {
      return null;
    }
    const { name, url, type, number, price, weight, id } = item;
    return (
      <div className="card">
        <Link to="/">
          <div className="deleteSign" onClick={() => this.deletePost(id)}>
            <ImCross />
          </div>
        </Link>
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
