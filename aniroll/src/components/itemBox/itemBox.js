import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemBox.sass";
import ItemCard from "../itemCard";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

export default class ItemBox extends Component {
  state = {
    itemList: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  updateItem() {
    const { getData } = this.props;
    getData()
      .then((itemList) => {
        this.setState({
          itemList: itemList.data,
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          item: null,
          error: true,
          loading: false,
        });
      });
  }

  deleteItem = (id) => {
    this.setState(({ itemList }) => {
      const index = itemList.findIndex((elem) => elem.id === id);
      const before = itemList.slice(0, index);
      const after = itemList.slice(index + 1);
      const newArray = [...before, ...after];

      return { itemList: newArray };
    });
  };

  renderItems(arr) {
    const { addToOrders } = this.props;
    if (arr) {
      return arr.map((item) => {
        return (
          <ItemCard
            item={item}
            key={item.id}
            onDelete={this.deleteItem}
            addToOrders={addToOrders}
          ></ItemCard>
        );
      });
    }
  }

  render() {
    if (!this.state.item && this.state.error) {
      return (
        <section className="spinnerBox">
          <ErrorMessage />;{" "}
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
        <Link to={"/createnew" + this.props.type}>
          <button className="addCard">Добавить товар</button>
        </Link>
      </section>
    );
  }
}