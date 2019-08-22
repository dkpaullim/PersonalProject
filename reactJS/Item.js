import React from "react";
import { Link } from "react-router-dom";

const Item = props => {
  const onDelete = (e) => {
    e.stopPropagation();
    props.delete(props.item.id);
  };

  const onEdit = (e) => {
    e.stopPropagation();
    props.edit(props.item.id);
  };

  const goToDetails = () => {
    props.history.push("/item/details", { id: props.item.id });
  };

  return (
    <div className="col-lg-4 col-sm-6 my-3">
      <div
        className="card card-default list-card col-lg-12"
        key={props.item.id}
        style={{ cursor: "pointer" }}
        onClick={goToDetails}
      >
        {/* <Link
          className="card-body text-center"
          style={{ cursor: "pointer" }}
          to={{
            pathname: "/item/details",
            state: { id: props.item.id }
          }}
        > */}
        <div  className="card-body text-center">
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
          /></div>
        {/* </Link> */}
        <div className="card-body">
          <div className="business-name">
            <h3 className="m-0 text-bold">{props.item.itemBrand}</h3>
          </div>
          <div className="mt-2 mb-3">
            <div className="text-truncate">
              <strong>{props.item.itemName}</strong>
            </div>

            <div className="text-truncate">{` $${props.item.price}`}</div>
          </div>
          <button onClick={onEdit} className="btn btn-secondary float-left">
            Edit
          </button>
          <button onClick={onDelete} className="btn btn-danger float-right">
            Delete
            <em className="fa-1x fas fa-trash-alt" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Item);
