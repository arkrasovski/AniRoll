import React, { Component } from "react";
import { Redirect } from "react-router";
import "./finishOrder.sass";
import Axios from "axios";
import { IMaskInput } from "react-imask";
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
    console.log("lol!");
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
    console.log("telNum", this.state.telNum);
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
            <form
              onClick={(e) => {
                e.preventDefault();
              }}
            >
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
                <IMaskInput
                  placeholder="+375 (29) 000-00-00"
                  mask={"+375 (00) 000-00-00"}
                  onBlur={(e) => this.blurHandler(e)}
                  name="telNum"
                  type="text"
                  lazy={true}
                  onAccept={(value, mask) => {
                    console.log("VALUE", mask.el.input);

                    this.setState({ telNum: value }, this.validateForm);
                    if (value.length < 19) {
                      mask.el.input.classList.add("empty");
                      this.setState(
                        {
                          telNumError: "Поле должно быть заполнено",
                          telNumDirty: true,
                        },
                        this.validateForm
                      );
                    } else {
                      mask.el.input.classList.remove("empty");
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
            </form>

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
