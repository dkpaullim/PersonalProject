import { Link } from "react-router-dom";
import React from "react";

const Item = props => {

  const onDelete = () => {
    props.delete(props.item.id);
  };

  const onEdit = () => {
    props.edit(props.item.id);
  };

  return (
    <div className="col-lg-4 col-sm-6 mt-2">
      <div
        className="card card-default list-card col-lg-12 mt-3"
        style={{ cursor: "pointer" }}
        key={props.item.id}
      >
        <div className="card-body text-center">
          {/* <div className="py-4" /> */}
          <img
            id="business-img"
            width="150"
            height="150"
            src={
              props.item.imageUrl
                ? props.item.imageUrl
                : "https://tinyurl.com/yxz75d7n"
            }
            alt="profile avatar"
          />
          <div className="business-name">
            <h3 className="m-0 text-bold">{props.item.itemBrand}</h3>
          </div>
          <div className="my-3">
            <div className="text-truncate">
              <strong>Item Name: </strong>
              {props.item.itemName}
            </div>
            <div className="text-truncate">
              <strong>Gender: </strong>
              {props.item.gender}
            </div>
            <div className="text-truncate">
              <strong>itemTypeId: </strong> {props.item.itemTypeId}
            </div>
            <div className="text-truncate">
              <strong>SizeId: </strong> {props.item.sizeId}
            </div>
            <div className="text-truncate">
              <strong>Color: </strong> {props.item.color}
            </div>
            <div className="text-truncate">
              <strong>Price: </strong>{" "}
              {` $${props.item.price}`}
            </div>
            <div className="text-truncate">
              <strong>Description: </strong> {props.item.itemDetails}
            </div>
          </div>
          <button
            onClick={onEdit}
                className="btn btn-secondary float-left"
              >Edit
              {/* <Link
                to={`/item/edit/${props.item.id}`}
                className="btn btn-secondary float-left"
                // onClick={onEdit}
              >
                <em className="fa-1x fas fa-edit" />
              </Link> */}
              </button>
              <button
                onClick={onDelete}
                className="btn btn-danger float-right"
              >
                Delete
                <em className="fa-1x fas fa-trash-alt" />
              </button>
  
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);
