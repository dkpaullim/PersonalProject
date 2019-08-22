import { TYPES } from "./actions";

export const items = (state = [], action) => {
  switch (action.type) {
    case TYPES.ADD_ITEM: {
      // let newItem = [...state];
      return state.concat(action.payload);
    }

    case TYPES.UPDATE_ITEM: {
      // let newItem = [...state];
      // action.payload.id = action.id
      return state.concat(action.payload);
    }

    case TYPES.DELETE_ITEM: {
      return [...state].filter(it => it.id !== Number(action.id));
    }

    case TYPES.ITEMS_RECEIVE_POSTS: {
      return [...action.payload];
    }

    // case TYPES.ITEM_GET:{
    //   return state.concat(action.payload)
    // }

    default:
      return state;
  }
};
