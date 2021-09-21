import React, { Component } from "react";
import "./createCardBox.sass";
import Axios from "axios";

export default class ItemBox extends Component {
  state = {
    name: "",
    url: "",
    number: "",
    price: "",
    weight: "",
    description: "",
  };

  submitCard = () => {
    const inputs = document.querySelectorAll("input[required]");
    const textarea = document.querySelector("textarea");

    inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("empty");
      }
    });
    console.log(this.state.name);

    Axios.post(`http://localhost:3002/api/create${this.props.type}`, {
      name: this.state.name,
      url: this.state.url,
      number: this.state.number,
      price: this.state.price,
      weight: this.state.weight,
      description: this.state.description,
    });
    textarea.value = "";
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  render() {
    return (
      <section className="main">
        <div className="uploadPost">
          <label>Название товара: </label>
          <input
            required
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ name: e.target.value });
            }}
          />
          <label>Url изображения: </label>
          <input
            required
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ url: e.target.value });
            }}
          />
          <label>Количество товаров: </label>
          <input
            required
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ number: e.target.value });
            }}
          />
          <label>Цена: </label>
          <input
            required
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ price: e.target.value });
            }}
          />
          <label>Вес: </label>
          <input
            required
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ weight: e.target.value });
            }}
          />

          <label>Описание: </label>
          <textarea
            type="text"
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ description: e.target.value });
            }}
          />

          <button onClick={this.submitCard}>Submit Post</button>
        </div>
      </section>
    );
  }
}