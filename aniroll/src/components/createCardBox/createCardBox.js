import React, { Component } from "react";
import "./createCardBox.sass";
import Axios from "axios";
import { ImCross } from "react-icons/im";
import Modal from "../modal";
import NoMatch from "../noMatch";
import { Redirect } from "react-router";
import DropDown from "../dropDown";

export default class ItemBox extends Component {
  state = {
    name: "",
    url: "",
    number: "",
    price: "",
    weight: "",
    measure: "гр",
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
            measure: itemToChange.measure,
            description: itemToChange.description,
            itemToChange,
          });
          console.log("old measure", this.state.itemToChange.measure);

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
          this.setState({
            modalActive: true,
            modalText: "Извините, что-то пошло не так",
          });
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
          measure: this.state.measure,
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
      measure: this.state.measure,
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
    if (this.props.isUpdate) {
      const { itemToChange } = this.state;
      if (
        this.state.name !== itemToChange.name ||
        this.state.url !== itemToChange.url ||
        +this.state.number !== itemToChange.number ||
        +this.state.price !== itemToChange.price ||
        +this.state.weight !== itemToChange.weight ||
        this.state.measure !== itemToChange.measure ||
        this.state.description !== itemToChange.description
      ) {
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
    this.setState({ modalActive: false });
    if (this.props.isUpdate) {
      this.setState({ Redirect: true });
    }
  };

  setMeasure = (measure) => {
    this.setState({ measure }, this.validateForm);
  };

  render() {
    console.log("measure", this.state.measure);
    if (this.state.Redirect) {
      return <Redirect push to={`/${this.props.type}`} />;
    }

    if (localStorage.getItem("isAdmin")) {
      return (
        <section className="main">
          <form
            className="uploadPost"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <label>Название товара: </label>
            {this.state.nameDirty && this.state.nameError && (
              <span className="validateError">{this.state.nameError}</span>
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
              <span className="validateError">{this.state.urlError}</span>
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
              <span className="validateError">{this.state.numberError}</span>
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
              <span className="validateError">{this.state.priceError}</span>
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
              <span className="validateError">{this.state.weightError}</span>
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

            <label>Единица измерения</label>
            <DropDown
              selected={this.state.measure}
              setSelected={this.setMeasure}
            />

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
              <span className="identValues">
                На данный момент значения идентичны
              </span>
            ) : null}
            <button
              className={this.state.formValid + "Disable"}
              disabled={!this.state.formValid}
              onClick={this.submitCard}
            >
              {this.props.isUpdate ? "Изменить" : "Добавить"}
            </button>
          </form>

          <Modal
            active={this.state.modalActive}
            setActive={this.setModalActive}
            content={this.state.modalText}
          />
        </section>
      );
    }

    if (!localStorage.getItem("isAdmin")) {
      return <NoMatch />;
    }
  }
}
