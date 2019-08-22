import * as svc from "../../services/itemsService";

export const TYPES = {
  ADD_ITEM: "ADD_ITEM",
  UPDATE_ITEM: "UPDATE_ITEM",
  DELETE_ITEM: "DELETE_ITEM",
  ITEMS_RECEIVE_POSTS: "ITEMS_RECEIVE_POSTS",
  ITEMS_REQUEST_POSTS: "ITEMS_REQUEST_POSTS",
  ITEM_GET: "ITEM_GET"
};

function addItem(data) {
  return {
    type: TYPES.ADD_ITEM,
    payload: data
  };
}

function updateItem(data, id) {
  return {
    type: TYPES.UPDATE_ITEM,
    payload: data,
    id
  };
}

function deleteItem(id) {
  return {
    type: TYPES.DELETE_ITEM,
    id
  };
}

function requestPosts() {
  return {
    type: TYPES.ITEMS_REQUEST_POSTS
  };
}

function receivePosts(items) {
  return {
    type: TYPES.ITEMS_RECEIVE_POSTS,
    payload: items
  };
}

// function getItemById(id) {
//     return {
//         type: TYPES.ITEM_GET,
//         payload: id
//     }
// }

export function add(data) {
  return dispatch => {
    return svc.addItem(data).then(() => dispatch(addItem(data)));
  };
}

export function update(data, id) {
  return dispatch => {
    return svc.updateItem(data, id).then(() => dispatch(updateItem(data, id)));
  };
}

export function deleteIt(id) {
  return dispatch => {
    return svc.deleteItem(id).then(() => dispatch(deleteItem(id)));
  };
}

export function getItems() {
  return dispatch => {
    dispatch(requestPosts());
    return svc
      .getItems()
      .then(data => data)
      .then(itemsToPassAlong => {
        return itemsToPassAlong;
      })
      .then(items => dispatch(receivePosts(items)));
  };
}

// export function getItemById(id) {
//     return dispatch => {
//         return svc.getById(id)
//         // .then(()=>dispatch(getItemById(id)))
//     }
// }
