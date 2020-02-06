import React from "react";
import * as itemsService from "../../services/itemsService";
import { Row } from "reactstrap";
import "./itemDetails.css";
import { Link } from "react-router-dom";

class ItemDetails extends React.Component {
  state = {
    form: {
      color: "",
      sizeId: "",
      reviewStarsId: "",
      itemName: "",
      itemDetails: "",
      itemTypeId: "",
      imageUrl: "",
      gender: "",
      price: "",
      itemBrand: "",
      id: ""
    }
  };

  componentDidMount() {
    debugger
    const id = this.props.location.state.id;
    itemsService
      .getById(id)
      .then(this.onGetItemByIdSuccess)
      .catch(this.onGetItemByIdError);
  }
  onGetItemByIdSuccess = resp => {
    this.setState(
      () => {
        return {
          form: resp
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    return (
      <div className="col-lg-12">
        <div
          className="card card-default list-card col-lg-12 mt-3"
          key={this.state.form.id}
        >
          <div className="header-links">
            <Link
              style={{ cursor: "pointer" }}
              to={{
                pathname: "/"
              }}
            >
              {" "}
              Home
            </Link>{" "}
            >
            <Link
              style={{ cursor: "pointer" }}
              to={{
                pathname: "/items"
              }}
            >
              {" "}
              Items
            </Link>
            {" >"} {this.state.form.itemBrand} - {this.state.form.itemName}
          </div>
          <Row>
            <div className="card-body col-lg-8">
              <img
                id="img"
                width="700"
                height="500"
                src={this.state.form.imageUrl}
                alt="profile avatar"
              />
            </div>
            <div className="card-body col-lg-4 mt-4">
              <div className="text">
                <h1 className="m-0 text-bold">{this.state.form.itemBrand}</h1>
              </div>
              <div className="text">{this.state.form.gender}</div>
              <div className="my-3">
                <div className="text">
                  <strong>{this.state.form.itemName}</strong>
                </div>
                <div className="text">{this.state.form.color}</div>
                <div className="text-price pt-1">{` $${
                  this.state.form.price
                }`}</div>
              </div>
              <div className="buttons mt-5">
                <div className="size pb-2">Size: </div>
                <Row>
                  <div className="pl-1 pb-1">
                    <button className="btn btn-light">6</button>
                  </div>
                </Row>
                <div className="pt-2">
                  <button className="btn btn-warning float-right">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Row>
        </div>
        <div className="card card-default list-card col-lg-12 my-3">
          <div className="text">
            <h3 className="text-bold mt-3">Details</h3>
            <div className="text-bold line">_____________</div>
          </div>
          <div className="item-details">
            <div className="text-bold my-3">{this.state.form.itemDetails}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemDetails;
