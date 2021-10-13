import React, { Component } from "react";
import { Redirect } from "react-router";
import "./finishOrder.sass";
import Axios from "axios";
import MaskedInput from "react-input-mask";
import Odzen from "../../images/odzen.png";
import Modal from "../modal";

export default class ItemBox extends Component {
  state = {
    orders: null,
    name: "",
    telNum: "",
    address: "",
    Redirect: false,

    nameDirty: false,
    telNumDirty: false,
    addressDirty: false,

    nameError: "Имя не может быть пустым",
    telNumError: "Номер телефона не может быть пустым",
    addressError: "Адрес не может быть пустым",

    formValid: false,

    modalActive: false,
    modalText: "",
  };

  componentDidMount() {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      this.setState({ orders });
    }
  }

  submitCard = async () => {
    const { orders } = this.state;
    let orderText = "";
    let sum = 0;
    orders.forEach((order) => {
      orderText += order.name + " x" + order.qtty + " ";
      sum += order.price * order.qtty;
    });

    Axios.post(`http://localhost:3002/api/addOrder`, {
      name: this.state.name,
      address: this.state.address,
      telNumber: this.state.telNum,
      orderText,
      total: sum,
    })
      .then((response) => {
        Axios.get(`http://localhost:3002/api/lastOrder`).then((response) => {
          console.log("nomer", response.data[0].ID);
          this.setState({
            modalActive: true,
            modalText: `Ваш заказ номер ${response.data[0].ID} успешно отправлен!`,
          });
        });

        console.log("ok", response);
      })
      .catch((error) => {
        this.setState({
          modalActive: true,
          modalText: "Извините, произошла ошибка",
        });
        console.log("ne ok", error);
      });
    // fetch("http://localhost:3002/api/addOrder", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     name: this.state.name,
    //     address: this.state.address,
    //     telNumber: this.state.telNum,
    //     orderText,
    //   }),
    // })
    //   .then((res) => {
    //     if (!res.ok) throw Error(res.statusText);
    //     return res.json();
    //   })
    //   .then((data) => console.log(data))
    //   .catch((error) => console.log(error));
  };

  blurHandler = (e) => {
    const name = e.target.name + "Dirty";
    this.setState({ [name]: true });
    if (e.target.value === "") {
      e.target.classList.add("empty");
    }
  };

  inputHandler = (e) => {
    e.target.classList.remove("empty");
    const name = e.target.name;
    const nameError = name + "Error";

    this.setState({ [name]: e.target.value }, this.validateForm);
    if (e.target.value === "") {
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
    this.setState({
      formValid:
        !this.state.nameError &&
        !this.state.addressError &&
        !this.state.telNumError,
    });
  };

  setModalActive = () => {
    this.setState({ modalActive: false });
    this.setState({ Redirect: true }, () => {
      localStorage.removeItem("orders");
    });
  };

  render() {
    console.log("orders", this.state.orders);
    if (this.state.Redirect) {
      return <Redirect push to="/" />;
    }
    if (!this.state.orders || this.state.orders.length === 0) {
      return (
        <section className="main">
          Ваша корзина пуста, сделайте сначала заказ
        </section>
      );
    }

    if (this.state.orders) {
      return (
        <section className="main">
          <div className="uploadPostWrapper">
            <div className="confirmOrder">
              <label>Ваше ФИО: </label>
              {this.state.nameDirty && this.state.nameError && (
                <span className="validateError">{this.state.nameError}</span>
              )}
              <div className="inputBox">
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Иванов Иван Иванович"
                  onBlur={(e) => this.blurHandler(e)}
                  onChange={(e) => {
                    this.inputHandler(e);
                  }}
                />
              </div>
              <label>Номер телефона: </label>

              {this.state.telNumDirty && this.state.telNumError && (
                <span className="validateError">{this.state.telNumError}</span>
              )}
              <div className="inputBox">
                <MaskedInput
                  placeholder="+375 (29) 999-99-99"
                  mask={"+375 (99) 999-99-99"}
                  onChange={(e) => {
                    this.setState({ telNumDirty: true });
                    e.target.classList.remove("empty");
                    this.setState(
                      { telNum: e.target.value },
                      this.validateForm
                    );
                    if (
                      e.target.value === "+375 (__) ___-__-__" ||
                      e.target.value.slice(-1) === "_"
                    ) {
                      e.target.classList.add("empty");
                      this.setState(
                        { telNumError: "Поле должно быть заполнено" },
                        this.validateForm
                      );
                    } else {
                      this.setState({ telNumError: "" }, this.validateForm);
                    }
                  }}
                />
              </div>
              <label>Адрес: </label>
              {this.state.addressDirty && this.state.addressError && (
                <span className="validateError">{this.state.addressError}</span>
              )}
              <div className="inputBox">
                <input
                  required
                  placeholder="ул. Бельского д. 1 кв. 1"
                  name="address"
                  type="text"
                  onBlur={(e) => this.blurHandler(e)}
                  onChange={(e) => {
                    this.inputHandler(e);
                  }}
                />
              </div>

              <button
                className={this.state.formValid + "Disable"}
                disabled={!this.state.formValid}
                onClick={() => {
                  this.submitCard();
                }}
              >
                Оформить заказ
              </button>
            </div>
            <img src={Odzen} alt="Одзен из аниме 'Созданный в бездне'"></img>
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
}
