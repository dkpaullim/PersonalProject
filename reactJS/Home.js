import React, { Component } from "react";
import "./home.css";
import { Row } from "reactstrap";
export class Home extends Component {
  static displayName = Home.name;

  redirectToShop = () => {
    this.props.history.push(`/items`);
  };

  render() {
    return (
      <div>
        <div
          className="container col-lg-12"
          style={{ cursor: "pointer" }}
          onClick={this.redirectToShop}
        >
          <img
            id="business-img"
            width="100%"
            height="500"
            src={
              "https://personalproject-items.s3-us-west-1.amazonaws.com/personalproject-itemscfb20d78-60dc-4d7f-ba35-9edd562e43cf_halfoff.jpeg"
            }
            alt="profile avatar"
          />
          <div class="text-block">
            <strong>
              <h1>Summer Sale</h1>
            </strong>
            <h2>Everything 50% Off</h2>
            <div className="pt-2 pb-1">
              <button
                className="btn btn-shop float-right"
                onClick={this.redirectToShop}
              >
                Shop Now
              </button>
            </div>
          </div>
        </div>

        <div className="boxes my-4">
          <Row>
            <div
              className="container col-lg-4"
              style={{ cursor: "pointer" }}
              onClick={this.redirectToShop}
            >
              <img
                id="img"
                width="100%"
                height="400"
                src={
                  "https://personalproject-items.s3-us-west-1.amazonaws.com/personalproject-items8e14dbb0-2cac-4e71-8bdf-957b5e7efc3b_pexels-photo-2266551.jpeg"
                }
                alt="profile avatar"
              /> <div
              className="text-center my-1"
              >TOPS</div> 
            </div>
            <div
              className="container col-lg-4"
              style={{ cursor: "pointer" }}
              onClick={this.redirectToShop}
            >
              <img
                id="img"
                width="100%"
                height="400"
                src={
                  "https://personalproject-items.s3-us-west-1.amazonaws.com/personalproject-items6efbf882-738c-4c3b-8c2a-5adffadba42f_nike+shoes.jpeg"
                }
                alt="profile avatar"
              /><div
              className="text-center my-1"
              >SHOES</div> 
            </div>
            <div
              className="container col-lg-4"
              style={{ cursor: "pointer" }}
              onClick={this.redirectToShop}
            >
              <img
                id="img"
                width="100%"
                height="400"
                src={
                  "https://personalproject-items.s3-us-west-1.amazonaws.com/personalproject-items8f47c44e-8e0b-4d3c-b0a4-a751964a8173_pexels-photo-794063.jpeg"
                }
                alt="profile avatar"
              /><div
              className="text-center my-1"
              >BOTTOMS</div> 
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
