import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemBox.sass";
import ItemCard from "../itemCard";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class ItemBox extends Component {
  state = {
    itemList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 1,
    max: 0,
  };

  componentDidMount() {
    this.onRequest();
    document.addEventListener("scroll", this.scrollHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler);
  }

  scrollHandler = (e) => {
    const footer = document.querySelector("footer");
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop +
          window.innerHeight +
          footer.offsetHeight) <
        100 &&
      this.state.itemList.length < this.state.max &&
      !this.state.newItemLoading
    ) {
      this.onRequest(this.state.offset);
    }
  };

  onRequest(offset) {
    this.onCharListLoading();
    const { getData, type } = this.props;
    getData(type, offset).then(this.onCharListLoaded).catch(this.onError);
  }

  onCharListLoaded = (newItemList) => {
    console.log("char is loaded!", newItemList);
    // if (newItemList.data.elements.length === 0 && this.state.offset !== 1) {
    //   console.log("pusto v zaprose  ");
    //   return;
    // }
    this.setState(({ itemList, offset, max }) => ({
      itemList: [...itemList, ...newItemList.data.elements],
      loading: false,
      newItemLoading: false,
      max: newItemList.data.max,
      offset: ++offset,
    }));
  };

  onError = () => {
    this.setState({
      item: null,
      error: true,
      loading: false,
    });
  };

  onCharListLoading = () => {
    this.setState({ newItemLoading: true });
  };

  renderItems(arr) {
    if (arr) {
      return arr.map((item) => {
        return (
          <ItemCard
            item={item}
            key={item.id}
            onDelete={this.deleteItem}
            getResponse={this.setModalActive}
            isAdmin={this.props.isAdmin}
            litres={this.props.litres}
          ></ItemCard>
        );
      });
    }
  }

  render() {
    console.log("offset", this.state.offset, "max", this.state.max);
    if (!this.state.item && this.state.error) {
      return (
        <section className="spinnerBox">
          <ErrorMessage />
        </section>
      );
    }

    if (this.state.loading) {
      return (
        <section className="spinnerBox">
          <Spinner />
        </section>
      );
    }

    const { itemList } = this.state;
    let items = this.renderItems(itemList);
    return (
      <section className="main">
        <div className="itemContainer"> {items}</div>
        {this.state.newItemLoading ? <Spinner /> : null}
        {localStorage.getItem("isAdmin") ? (
          <Link to={"/createnew" + this.props.type}>
            <button className="addCard">Добавить товар</button>
          </Link>
        ) : null}
      </section>
    );
  }
}
