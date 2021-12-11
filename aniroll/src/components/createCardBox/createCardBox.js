import React, { Component } from "react";
import "./createCardBox.sass";
import { ImCross } from "react-icons/im";
import Modal from "../modal";
import NoMatch from "../noMatch";
import { Redirect, withRouter } from "react-router";
import DropDown from "../dropDown";
import Spinner from "../spinner";

class CreateCardBox extends Component {
  state = {
    name: "",
    url: "",
    number: "",
    price: "",
    weight: "",
    measure: "гр",
    description: "",
    itemToChange: null,
    loading: false,

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
    error: false,
  };

  componentDidMount() {
    if (this.props.isUpdate) {
      const { getData, type } = this.props;
      const id = this.props.match.params.id;

      this.setState({ loading: true });
      getData(type, id)
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
            loading: false,
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
          });

          // const data = [
          //   itemToChange.name,
          //   itemToChange.url,
          //   itemToChange.number,
          //   itemToChange.price,
          //   itemToChange.weight,
          // ];
          // const inputs = document.querySelectorAll("input[required]");
          // inputs.forEach((input, i) => {
          //   input.value = data[i];
          // });

          //const textarea = document.querySelector("textarea");
          //textarea.value = itemToChange.description;
        })
        .catch((e) => {
          this.setState({
            modalActive: true,
            modalText: "Извините, что-то пошло не так",
            //тут оно попадет в loading и отрисует ничего
          });
        });
    }
  }

  submitCard = () => {
    //const inputs = document.querySelectorAll("input[required]");
    //const textarea = document.querySelector("textarea");
    this.setState({ loading: true });
    const { itemToChange } = this.state;
    const { changeData } = this.props;
    if (this.props.isUpdate) {
      changeData(itemToChange.type, itemToChange.id, {
        name: this.state.name,
        url: this.state.url,
        number: this.state.number,
        price: this.state.price,
        weight: this.state.weight,
        measure: this.state.measure,
        description: this.state.description,
        id: itemToChange.id,
      })
        .then((response) => {
          this.setState({
            //loading: false,
            modalActive: true,
            modalText: "Товар успешно обновлен!",
          });
          console.log("ok", response);
        })
        .catch((error) => {
          this.setState({
            //loading: false,
            modalActive: true,
            modalText: "Извините, не получилось обновить товар",
          });
          console.log("ne ok", error);
        });
      return;
    }
    const { postData, type } = this.props;
    postData(type, {
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
          //loading: false,
          modalActive: true,
          modalText: "Товар успешно добавлен!",
          name: "",
          url: "",
          number: "",
          price: "",
          weight: "",
          description: "",
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
        //textarea.value = "";
        //inputs.forEach((input) => {
        //  input.value = "";
        //});
        console.log("ok", response);
      })
      .catch((error) => {
        this.setState({
          //loading: false,
          modalActive: true,
          modalText: "Извините, не получилось добавить товар",
          error: true,
        });
        console.log("ne ok", error);
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
    if (this.state.error) {
      this.setState({ Redirect: true });
    }
    if (!this.props.isUpdate) {
      this.setState({ loading: false });
    }
  };

  setMeasure = (measure) => {
    this.setState({ measure }, this.validateForm);
  };

  render() {
    if (this.state.Redirect) {
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
            setActive={this.setModalActive}
            content={this.state.modalText}
          />
        </section>
      );
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
                value={this.state.name}
                maxLength="30"
                type="text"
                name="name"
                onBlur={this.blurHandler}
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
                value={this.state.url}
                required
                type="text"
                id="url"
                name="url"
                onBlur={this.blurHandler}
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
                    
                    inputUrl.classList.add("empty");
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
                value={this.state.number}
                maxLength="7"
                type="text"
                name="number"
                onBlur={this.blurHandler}
                onChange={this.numericInputHandler}
              />
            </div>
            <label>Цена: </label>
            {this.state.priceDirty && this.state.priceError && (
              <span className="validateError">{this.state.priceError}</span>
            )}
            <div className="inputBox">
              <input
                required
                value={this.state.price}
                maxLength="7"
                type="text"
                name="price"
                onBlur={this.blurHandler}
                onChange={this.numericInputHandler}
              />
            </div>
            <label>Вес: </label>
            {this.state.weightDirty && this.state.weightError && (
              <span className="validateError">{this.state.weightError}</span>
            )}
            <div className="inputBox">
              <input
                required
                value={this.state.weight}
                maxLength="7"
                type="text"
                name="weight"
                onBlur={this.blurHandler}
                onChange={this.numericInputHandler}
              />
            </div>

            <label>Единица измерения</label>
            <DropDown
              selected={this.state.measure}
              setSelected={this.setMeasure}
              options={["гр", "кг", "л"]}
            />

            <label>Описание: </label>
            <div className="inputBox">
              <textarea
                value={this.state.description}
                maxLength="300"
                type="text"
                name="description"
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
                    
                    this.setState({ description: "" }, this.validateForm);
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
export default withRouter(CreateCardBox);
