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

    nameDirty: false,
    urlDirty: false,
    numberDirty: false,
    priceDirty: false,
    weightDirty: false,

    nameError: "Имя не может быть пустым",
    urlError: "Url не может быть пустым",
    numberError: "Количество не может быть пустым",
    priceError: "Цена не может быть пустой",
    weightError: "Вес не может быть пустым",

    formValid: false,
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

  // componentDidUpdate(prevState) {
  //   if (
  //     prevState.nameError !== this.state.nameError &&
  //     prevState.urlError !== this.state.urlError &&
  //     prevState.numberError !== this.state.numberError &&
  //     prevState.priceError !== this.state.priceError &&
  //     prevState.weightError !== this.state.weightError
  //   ) {
  //     if (
  //       !this.state.nameError &&
  //       !this.state.urlError &&
  //       !this.state.numberError &&
  //       !this.state.priceError &&
  //       !this.state.weightError
  //     ) {
  //       this.setState({ formValid: true });
  //     } else {
  //       this.setState({ formValid: false });
  //     }
  //   }
  // }

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
    }).then(console.log("yspeh"));
    this.setState({
      formValid: false,
      nameDirty: false,
      urlDirty: false,
      numberDirty: false,
      priceDirty: false,
      weightDirty: false,
      nameError: "Имя не может быть пустым",
      urlError: "Url не может быть пустым",
      numberError: "Количество не может быть пустым",
      priceError: "Цена не может быть пустой",
      weightError: "Вес не может быть пустым",
    });

    textarea.value = "";
    inputs.forEach((input) => {
      input.value = "";
    });
  };

  blurHandler = (e) => {
    const name = e.target.name + "Dirty";
    this.setState({ [name]: true });
  };

  numericInputHandler = (e) => {
    e.target.classList.remove("empty");
    const name = e.target.name;
    const nameError = name + "Error";
    this.setState({ [name]: e.target.value });
    if (isNaN(e.target.value)) {
      this.setState(
        { [nameError]: "Введено некорректное значение" },
        this.validateForm
      );
    } else if (e.target.value === "") {
      this.setState(
        { [nameError]: "Поле должно быть заполнено" },
        this.validateForm
      );
    } else {
      this.setState({ [nameError]: "" }, this.validateForm);
    }
  };

  validateForm = () => {
    console.log(
      "proverka",
      !this.state.nameError &&
        !this.state.urlError &&
        !this.state.numberError &&
        !this.state.priceError &&
        !this.state.weightError
    );
    this.setState({
      formValid:
        !this.state.nameError &&
        !this.state.urlError &&
        !this.state.numberError &&
        !this.state.priceError &&
        !this.state.weightError,
    });
  };

  render() {
    console.log(this.state.formValid);
    return (
      <section className="main">
        <div className="uploadPost">
          <label>Название товара: </label>
          {this.state.nameDirty && this.state.nameError && (
            <div style={{ color: "red" }}>{this.state.nameError}</div>
          )}
          <input
            required
            type="text"
            name="name"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ name: e.target.value });
              if (e.target.value === "") {
                this.setState(
                  { nameError: "Поле должно быть заполнено" },
                  this.validateForm
                );
              } else {
                this.setState({ nameError: "" }, this.validateForm);
              }
            }}
          />
          <label>Url изображения: </label>
          {this.state.urlDirty && this.state.urlError && (
            <div style={{ color: "red" }}>{this.state.urlError}</div>
          )}
          <input
            required
            type="text"
            name="url"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ url: e.target.value });
              if (e.target.value === "") {
                this.setState(
                  { urlError: "Поле должно быть заполнено" },
                  this.validateForm
                );
              } else {
                this.setState({ urlError: "" }, this.validateForm);
              }
            }}
          />
          <label>Количество товаров: </label>
          {this.state.numberDirty && this.state.numberError && (
            <div style={{ color: "red" }}>{this.state.numberError}</div>
          )}
          <input
            required
            type="text"
            name="number"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              this.numericInputHandler(e);
            }}
          />
          <label>Цена: </label>
          {this.state.priceDirty && this.state.priceError && (
            <div style={{ color: "red" }}>{this.state.priceError}</div>
          )}
          <input
            required
            type="text"
            name="price"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              this.numericInputHandler(e);
            }}
          />
          <label>Вес: </label>
          {this.state.weightDirty && this.state.weightError && (
            <div style={{ color: "red" }}>{this.state.weightError}</div>
          )}
          <input
            required
            type="text"
            name="weight"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              this.numericInputHandler(e);
            }}
          />

          <label>Описание: </label>
          <textarea
            type="text"
            name="description"
            onBlur={(e) => this.blurHandler(e)}
            onChange={(e) => {
              e.target.classList.remove("empty");
              this.setState({ description: e.target.value });
            }}
          />
          <button disabled={!this.state.formValid} onClick={this.submitCard}>
            Submit Post
          </button>
        </div>
      </section>
    );
  }
}
