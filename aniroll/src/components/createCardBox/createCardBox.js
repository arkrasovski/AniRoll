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
    itemToChange: null,
  };

  componentDidMount() {
    if (this.props.isUpdate) {
      const { getData } = this.props;
      getData()
        .then((item) => {
          const itemToChange = item.data[0];
          this.setState({
            name: itemToChange.name,
            url: itemToChange.url,
            number: itemToChange.number,
            price: itemToChange.price,
            weight: itemToChange.weight,
            description: itemToChange.description,
            itemToChange,
          });

          const data = [
            itemToChange.name,
            itemToChange.url,
            itemToChange.number,
            itemToChange.price,
            itemToChange.weight,
          ];
          const inputs = document.querySelectorAll("input[required]");
          inputs.forEach((input, i) => {
            input.value = data[i];
          });
          const textarea = document.querySelector("textarea");
          textarea.value = itemToChange.description;
        })
        .catch(() => {
          console.log("error!");
        });
    }
  }

  submitCard = () => {
    const inputs = document.querySelectorAll("input[required]");
    const textarea = document.querySelector("textarea");

    inputs.forEach((input) => {
      if (!input.value) {
        input.classList.add("empty");
      }
    });

    const { itemToChange } = this.state;

    if (this.props.isUpdate) {
      if (
        (this.state.name !== itemToChange.name ||
          this.state.url !== itemToChange.url ||
          this.state.number !== itemToChange.number ||
          this.state.price !== itemToChange.price ||
          this.state.weight !== itemToChange.weight ||
          this.state.description !== itemToChange.description) &&
        (this.state.name !== "" ||
          this.state.url !== "" ||
          this.state.number !== "" ||
          this.state.price !== "" ||
          this.state.weight !== "" ||
          this.state.description !== "")
      ) {
        Axios.post(
          `http://localhost:3002/api/change${itemToChange.type}FromId/${itemToChange.id}`,
          {
            name: this.state.name,
            url: this.state.url,
            number: this.state.number,
            price: this.state.price,
            weight: this.state.weight,
            description: this.state.description,
            id: itemToChange.id,
          }
        );
      }
      return;
    }

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
