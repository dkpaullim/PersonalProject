import React from "react";
import * as itemsService from "../../services/itemsService";
import swal from "sweetalert";
import Item from "./Item";

class Items extends React.Component {
  state = {
    itemCards: []
  };

  componentDidMount() {
    itemsService
      .getItems()
      .then(this.ongetItemsSuccess)
      .catch(this.onError);
  }

  ongetItemsSuccess = resp => {
    console.log(resp);
    this.setState(() => {
      return {
        itemCards: resp.map(this.mapItem)
      };
    });
  };

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
        itemsService
          .deleteItem(id)
          .then(this.onDeleteSuccess(id))
          .catch(this.onDeleteError);
        swal("Your item file has been deleted.", {
          icon: "success"
        });
      } else {
        swal("Your item file is safe.");
      }
    });
  };

  onDeleteSuccess = id => {
    this.setState(prevState => {
      const items = [...prevState.itemCards];
      const index = items.findIndex(entre => entre.props.item.id === id);
      items.splice(index, 1);
      return {
        itemCards: items
      };
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
        history={this.props.history}
      />
    );
  };

  render() {
    return (
      <div>
        <div>Items</div>
        <div className="row mb-2">{this.state.itemCards}</div>
      </div>
    );
  }
}

export default Items;
