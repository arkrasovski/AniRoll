import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./itemBox.sass";
import ItemCard from "../itemCard";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";
import Modal from "../modal";

export default class ItemBox extends Component {
  state = {
    itemList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 1,
    max: 0,

    modalActive: false,
    modalText: "",
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
    getData(type, offset)
      .then(this.onCharListLoaded)
      .catch((e) => {
        console.log(e.request, "242qrqw");
        if (e.response === undefined) {
          return this.onError();
        }

        if (e.response.status === 404) {
          if (this.state.offset === 1) {
            this.setState({ loading: false });
            console.log("tovarov net");
          }
          console.log("slychai esli udalili i odnovremenno rabotaet user");
          return;
        }
        this.onError();
      });
  }

  onCharListLoaded = (newItemList) => {
    console.log("char is loaded!");
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

  deleteItem = (id) => {
    this.setState(({ itemList, max }) => {
      const index = itemList.findIndex((elem) => elem.id === id);
      const before = itemList.slice(0, index);
      const after = itemList.slice(index + 1);
      const newArray = [...before, ...after];
      return { itemList: newArray, max: --max };
    });
    const { getData, type } = this.props;
    if (this.state.itemList.length !== this.state.max) {
      getData(type, this.state.offset - 1)
        .then((newItemList) => {
          const index = this.state.itemList.findIndex(
            (elem) =>
              elem.id ===
              newItemList.data.elements[newItemList.data.elements.length - 1].id
          ); // На случай если одновременно удалят что либо

          this.setState(({ itemList }) => ({
            itemList:
              index > -1
                ? [...itemList]
                : [
                    ...itemList,
                    newItemList.data.elements[
                      newItemList.data.elements.length - 1
                    ],
                  ],
            max: newItemList.data.max,
          }));
        })
        .catch((e) => {
          console.log(e);
          this.onError();
        });
    }
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

  setModalActive = (isOk) => {
    if (isOk) {
      this.setState({
        modalActive: true,
        modalText: "Товар успешно удалён!",
      });
    } else {
      this.setState({
        modalActive: true,
        modalText: "Извините, не получилось удалить товар",
      });
    }
  };

  setModalUnActive = () => {
    this.setState({ modalActive: false });
    //window.location.reload();
  };

  render() {
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
        {localStorage.getItem("isAdmin") ? (
          <Link to={"/createnew" + this.props.type}>
            <button className="addCard">Добавить товар</button>
          </Link>
        ) : null}

        <Modal
          active={this.state.modalActive}
          setActive={this.setModalUnActive}
          content={this.state.modalText}
        />
      </section>
    );
  }
}
