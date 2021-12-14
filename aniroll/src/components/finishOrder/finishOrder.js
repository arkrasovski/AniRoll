import React, { Component } from "react";
import { Redirect } from "react-router";
import "./finishOrder.sass";
import { IMaskInput } from "react-imask";
import Odzen from "../../images/odzen.png";
import Modal from "../modal";
import DropDown from "../dropDown";
import Spinner from "../spinner";
import hhi from "../../images/hhi.jpg";

export default class ItemBox extends Component {
  GetDates = (startDate, daysToAdd) => {
    var aryDates = [];
    let i = new Date().getHours() < 23 ? 0 : 1;
    let end = new Date().getHours() < 23 ? daysToAdd : daysToAdd + 1;
    for (i; i <= end; i++) {
      var currentDate = new Date();
      currentDate.setDate(startDate.getDate() + i);
      aryDates.push(`${currentDate.getDate()}.${currentDate.getMonth() + 1}`);
    }

    return aryDates;
  };

  state = {
    orders: null,
    name: "",
    telNum: "",
    address: "",
    Redirect: false,
    loading: false,

    nameDirty: false,
    telNumDirty: false,
    addressDirty: false,

    nameError: "Имя не может быть пустым",
    telNumError: "Номер телефона не может быть пустым",
    addressError: "Адрес не может быть пустым",

    day:
      new Date().getHours() < 23
        ? `${new Date().getDate()}.${+new Date().getMonth() + 1}`
        : `${new Date().getDate() + 1}.${+new Date().getMonth() + 1}`,
    dayArray: this.GetDates(new Date(), 5),

    time:
      new Date().getHours() < 23 && new Date().getHours() > 10
        ? `${new Date().getHours() + 1}:00-${
            new Date().getHours() + 2 === 24 ? "00" : new Date().getHours() + 2
          }:00`
        : "11:00-12:00",
    timeArray: [
      "11:00-12:00",
      "12:00-13:00",
      "13:00-14:00",
      "14:00-15:00",
      "15:00-16:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
      "20:00-21:00",
      "21:00-22:00",
      "22:00-23:00",
      "23:00-00:00",
    ],

    formValid: false,

    modalActive: false,
    modalText: "",
    problemWithTime: false,
    //catchedProblem: false,
  };

  componentDidMount() {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      this.setState({ orders });
    }
  }

  submitCard = () => {
    if (
      parseInt(this.state.time) <= new Date().getHours() &&
      this.state.day === `${new Date().getDate()}.${+new Date().getMonth() + 1}`
    ) {
      this.setState({
        modalActive: true,
        modalText: "Указано неверное время",
        problemWithTime: true,
        day:
          new Date().getHours() < 23
            ? `${new Date().getDate()}.${+new Date().getMonth() + 1}`
            : `${new Date().getDate() + 1}.${+new Date().getMonth() + 1}`,
        dayArray: this.GetDates(new Date(), 5),

        time:
          new Date().getHours() < 23 && new Date().getHours() > 10
            ? `${new Date().getHours() + 1}:00-${
                new Date().getHours() + 2 === 24
                  ? "00"
                  : new Date().getHours() + 2
              }:00`
            : "11:00-12:00",
      });
    } else {
      const { orders } = this.state;
      const { postOrder, getLastOrder } = this.props;
      let orderText = "";
      let sum = 0;
      orders.forEach((order) => {
        orderText += order.name + " x" + order.qtty + " ";
        sum += order.price * order.qtty;
      });
     
      const deliveryDate =
        this.state.time + "." + this.state.day + "." + new Date().getFullYear();

      this.setState({ loading: true });
      postOrder({
        name: this.state.name,
        address: this.state.address,
        telNumber: this.state.telNum,
        orderText,
        total: Math.round(sum * 100) / 100,
        deliveryDate,
      })
        .then((response) => {
          getLastOrder().then((response) => {
            this.setState({
              //loading: false,
              modalActive: true,
              modalText: `Ваш заказ номер ${response.data[0].ID} успешно отправлен!`,
              //orders: null // для того чтобы если модалка схлопнется нельзя было пустые заказывать
            });
          });
          localStorage.removeItem("orders");
          console.log("ok", response);
        })
        .catch((error) => {
          this.setState({
            //loading: false,
            modalActive: true,
            modalText: "Извините, произошла ошибка",
            //catchedProblem: true,
          });
          console.log("ne ok", error);
        });
    }
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

    this.setState({ [name]: e.target.value });
    //this.setState({ [name]: e.target.value }, this.validateForm);
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
    if (this.state.problemWithTime) {
      this.setState({ modalActive: false, problemWithTime: false });
      return;
    }
    //     if (this.state.catchedProblem) {
    //       this.setState({ modalActive: false });
    //       this.setState({ Redirect: true });
    //       return;
    //     }

    this.setState({ modalActive: false });
    this.setState(
      { Redirect: true }
      //, () => {
      //localStorage.removeItem("orders");
      //}
    );
  };

  setDay = (day) => {
    this.setState({
      day,
      time:
        day === `${new Date().getDate()}.${+new Date().getMonth() + 1}`
          ? `${new Date().getHours() + 1}:00-${
              new Date().getHours() + 2 === 24
                ? "00"
                : new Date().getHours() + 2
            }:00`
          : "11:00-12:00",
    });
  };

  setTime = (time) => {
    this.setState({ time });
  };

  filterTime = (array) => {
    return array.filter((el, i) => i > new Date().getHours() - 11);
  };

  render() {
    if (this.state.Redirect) {
      return <Redirect push to="/" />;
    }
    if (!this.state.orders || this.state.orders.length === 0) {
      return (
        <section className="mainFinishOrder">
          <div className="emptyOrder">
            <span>Ваша корзина пуста, сделайте сначала заказ</span>
            <img src={hhi} alt="Хитрый хайповый извращенец" />
          </div>
          
        </section>
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

    if (this.state.orders) {
      return (
        <section className="mainFinishOrder">
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
                  onBlur={this.blurHandler}
                  onChange={this.inputHandler}
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
                  onBlur={this.blurHandler}
                  name="telNum"
                  type="text"
                  lazy={true}
                  onAccept={(value, mask) => {
                    //this.setState({ telNum: value }, this.validateForm);
                    this.setState({ telNum: value });
                    if (value.length < 19) {
                      mask.el.input.classList.add("empty");
                      this.setState(
                        {
                          telNumError: "Поле должно быть заполнено",
                          //telNumDirty: true,
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
                  onBlur={this.blurHandler}
                  onChange={this.inputHandler}
                />
              </div>

              <label>Выберите дату доставки</label>
              <div className="dropdowns">
                <DropDown
                  selected={this.state.day}
                  setSelected={this.setDay}
                  options={this.state.dayArray}
                />

                <DropDown
                  selected={this.state.time}
                  setSelected={this.setTime}
                  options={
                    `${new Date().getDate()}.${+new Date().getMonth() + 1}` ===
                    this.state.day
                      ? this.filterTime(this.state.timeArray)
                      : this.state.timeArray
                  }
                  specialClass={"time"}
                />
              </div>

              <button
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
