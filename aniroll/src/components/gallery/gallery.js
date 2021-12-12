import React, { Component } from "react";
import "./gallery.sass";
import yato from "./../../images/yato.png";
import rem from "./../../images/rem.png";
import odzen from "./../../images/odzen.png";
import footer from "./../../images/footer.png";
import errorImage from "./../../images/errorImage.png";
import megumin from "../../images/megumin.png";
import hhi from "./../../images/hhi.jpg";

export default class AdminLogin extends Component {
  state = {
    name: [
      "Ято",
      "Сома Юкихира",
      "Бессмер",
      "Рем",
      "Одзен",
      "Мегумин",
      "Хитрый хайповый извращенец",
    ],
    title: [
      "Бездомный бог",
      "Повар-боец Сома",
      "Для тебя, бессмертный",
      "Re:zero",
      "Созданный в бездне",
      "Богиня благословляет этот прекрасный мир",
      "Палина не придумала",
    ],
    author: [
      "Адати Тока",
      "Юто Цукуда, Сюна Саэки",
      "Оойма Ёситоки",
      "Таппэй Нагацуки, Синъитиро Оцуки",
      "Цукуси Акихито",
      "Кума Хиру, Хагурэ Юки",
      "Weptashka",
    ],
    img: [yato, footer, errorImage, rem, odzen, megumin, hhi],
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderItems = (arr) => {
    return arr.map((item, i) => {
      return (
        <div className="galeryCard" key={i}>
          <img src={this.state.img[i]} alt={item} />
          <div className="about">
            <div>
              <span>{item}</span>
              <span>Название сериала: {this.state.title[i]}</span>
              <span>Автор: {this.state.author[i]}</span>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    const items = this.renderItems(this.state.name);
    return (
      <section className="mainGallery">
        <h2>Галерея персонажей сервиса AniRoll</h2>
        {items}
      </section>
    );
  }
}
