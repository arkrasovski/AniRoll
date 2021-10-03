import React, { Component } from "react";
import "./createCardBox.sass";
import Axios from "axios";
import { ImCross } from "react-icons/im";
import Modal from "../modal";
import { Redirect } from "react-router";

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
    isUpdated: false,

    modalActive: false,
    modalText: "",

    Redirect: false,
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
          this.setState(
            {
              nameDirty: true,
              urlDirty: true,
              numberDirty: true,
              priceDirty: true,
              weightDirty: true,
              nameError: "",
              urlError: "",
              numberError: "",
              priceError: "",
              weightError: "",
            },
            this.validateForm
          );
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

    const { itemToChange } = this.state;

    if (this.props.isUpdate) {
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
      )
        .then((response) => {
          this.setState({
            modalActive: true,
            modalText: "Товар успешно обновлен!",
          });
          console.log("ok", response);
        })
        .catch((error) => {
          this.setState({
            modalActive: true,
            modalText: "Извините, не получилось обновить товар",
          });
          console.log("ne ok", error);
        });

      this.setState(
        {
          formValid: false,
          nameDirty: false,
          urlDirty: false,
          numberDirty: false,
          priceDirty: false,
          weightDirty: false,
          nameError: "",
          urlError: "",
          numberError: "",
          priceError: "",
          weightError: "",
        },
        this.validateForm
      );
      return;
    }

    Axios.post(`http://localhost:3002/api/create${this.props.type}`, {
      name: this.state.name,
      url: this.state.url,
      number: this.state.number,
      price: this.state.price,
      weight: this.state.weight,
      description: this.state.description,
    })
      .then((response) => {
        this.setState({
          modalActive: true,
          modalText: "Товар успешно добавлен!",
          description: "",
          url: "",
        });
        textarea.value = "";
        inputs.forEach((input) => {
          input.value = "";
        });
        console.log("ok", response);
      })
      .catch((error) => {
        this.setState({
          modalActive: true,
          modalText: "Извините, не получилось добавить товар",
        });
        console.log("ne ok", error);
      });
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
  };

  blurHandler = (e) => {
    const name = e.target.name + "Dirty";
    this.setState({ [name]: true });
    if (e.target.value === "") {
      e.target.classList.add("empty");
    }
  };

  numericInputHandler = (e) => {
    e.target.classList.remove("empty");
    const name = e.target.name;
    const nameError = name + "Error";
    this.setState({ [name]: e.target.value }, this.validateForm);
    if (isNaN(e.target.value)) {
      e.target.classList.add("empty");
      this.setState(
        { [nameError]: "Введено некорректное значение" },
        this.validateForm
      );
    } else if (e.target.value === "") {
      e.target.classList.add("empty");
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
    if (this.props.isUpdate) {
      const { itemToChange } = this.state;
      if (
        this.state.name !== itemToChange.name ||
        this.state.url !== itemToChange.url ||
        +this.state.number !== itemToChange.number ||
        +this.state.price !== itemToChange.price ||
        +this.state.weight !== itemToChange.weight ||
        this.state.description !== itemToChange.description
      ) {
        console.log(
          "ultraproverka",
          typeof this.state.price,
          typeof itemToChange.price
        );
        this.setState({
          formValid:
            !this.state.nameError &&
            !this.state.urlError &&
            !this.state.numberError &&
            !this.state.priceError &&
            !this.state.weightError,
          isUpdated: true,
        });
      } else {
        console.log("fu");
        this.setState({ formValid: false, isUpdated: false });
      }
      return;
    }

    this.setState({
      formValid:
        !this.state.nameError &&
        !this.state.urlError &&
        !this.state.numberError &&
        !this.state.priceError &&
        !this.state.weightError,
    });
  };

  setModalActive = () => {
    //console.log("clicked");
    this.setState({ modalActive: false });
    if (this.props.isUpdate) {
      this.setState({ Redirect: true });
    }
  };

  render() {
    console.log("formValid", this.state.formValid);
    if (this.state.Redirect) {
      return <Redirect push to={`/${this.state.itemToChange.type}`} />;
    }

    return (
      <section className="main">
        <div className="uploadPost">
          <label>Название товара: </label>
          {this.state.nameDirty && this.state.nameError && (
            <div style={{ color: "red" }}>{this.state.nameError}</div>
          )}
          <div className="inputBox">
            <input
              required
              maxLength="30"
              type="text"
              name="name"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ name: e.target.value }, this.validateForm);
                if (e.target.value === "") {
                  e.target.classList.add("empty");
                  this.setState(
                    { nameError: "Поле должно быть заполнено" },
                    this.validateForm
                  );
                } else {
                  this.setState({ nameError: "" }, this.validateForm);
                }
              }}
            />
          </div>
          <label>Url изображения: </label>
          {this.state.urlDirty && this.state.urlError && (
            <div style={{ color: "red" }}>{this.state.urlError}</div>
          )}
          <div className="inputBox">
            <input
              required
              type="text"
              id="url"
              name="url"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState({ url: e.target.value }, this.validateForm);
                if (e.target.value === "") {
                  e.target.classList.add("empty");
                  this.setState(
                    { urlError: "Поле должно быть заполнено" },
                    this.validateForm
                  );
                } else {
                  this.setState({ urlError: "" }, this.validateForm);
                }
              }}
            />
            {this.state.url ? (
              <ImCross
                onClick={() => {
                  const inputUrl = document.querySelector("#url");
                  console.log(inputUrl);
                  inputUrl.value = "";
                  this.setState(
                    {
                      url: "",
                      urlError: "Url не может быть пустым",
                    },
                    this.validateForm
                  );
                }}
              />
            ) : null}
          </div>
          <label>Количество товаров: </label>
          {this.state.numberDirty && this.state.numberError && (
            <div style={{ color: "red" }}>{this.state.numberError}</div>
          )}
          <div className="inputBox">
            <input
              required
              type="text"
              name="number"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                this.numericInputHandler(e);
              }}
            />
          </div>
          <label>Цена: </label>
          {this.state.priceDirty && this.state.priceError && (
            <div style={{ color: "red" }}>{this.state.priceError}</div>
          )}
          <div className="inputBox">
            <input
              required
              type="text"
              name="price"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                this.numericInputHandler(e);
              }}
            />
          </div>
          <label>Вес: </label>
          {this.state.weightDirty && this.state.weightError && (
            <div style={{ color: "red" }}>{this.state.weightError}</div>
          )}
          <div className="inputBox">
            <input
              required
              type="text"
              name="weight"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                this.numericInputHandler(e);
              }}
            />
          </div>

          <label>Описание: </label>
          <div className="inputBox">
            <textarea
              maxLength="300"
              type="text"
              name="description"
              onBlur={(e) => this.blurHandler(e)}
              onChange={(e) => {
                e.target.classList.remove("empty");
                this.setState(
                  { description: e.target.value },
                  this.validateForm
                );
              }}
            />
            {this.state.description ? (
              <ImCross
                onClick={() => {
                  const textarea = document.querySelector("textarea");
                  textarea.value = "";
                  this.setState({ description: "" });
                }}
              />
            ) : null}
          </div>
          {!this.state.isUpdated && this.props.isUpdate ? (
            <span>На данный момент значения идентичны</span>
          ) : null}
          <button
            className={this.state.formValid + "Disable"}
            disabled={!this.state.formValid}
            onClick={this.submitCard}
          >
            Submit Post
          </button>
        </div>
        <Modal
          active={this.state.modalActive}
          setActive={this.setModalActive}
          content={this.state.modalText}
        />
      </section>
    );
  }
}
