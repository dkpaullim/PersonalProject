import React from "react";
// import * as itemsService from "../../services/itemsService";
import swal from "sweetalert";
import Item from "./Item";
import { connect } from "react-redux";
import { deleteIt, getItems } from "../../state/items/actions";

class Items extends React.Component {
  componentDidMount() {
    this.props.getItems();
  }

  onError = () => {
    swal({
      title: "Uh Oh",
      text: "Please go back and complete the form",
      icon: "warning",
      dangerMode: true
    });
  };

  deleteItem = id => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item.",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.props.deleteIt(id).then(
          swal("Your item file has been deleted.", {
            icon: "success"
          })
        );
      } else {
        swal("Your item file is safe.");
      }
    });
  };

  editItem = id => {
    this.props.history.push(`/item/edit/${id}`);
  };

  mapItem = item => {
    return (
      <Item
        key={item.id}
        item={item}
        edit={this.editItem}
        delete={this.deleteItem}
      />
    );
  };

  render() {
    return (
      <div>
        <div>Items</div>
        <div className="row mt-2">{this.props.items.map(this.mapItem)}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = { deleteIt, getItems };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Items);
