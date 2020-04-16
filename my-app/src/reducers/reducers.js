import {
  ITEM_LIST, DELETE_ITEM, REFRESH_LIST
} from '../actions/constants';
 import data from '../../src/data.js';
console.log(data, 'data json')

export function getItemListReducer(state = data, action) {
  console.log(action, 'acrion')
  // if (action.type == ITEM_LIST) {
  //   return [...action.payload]
  // }
  if (action.type == DELETE_ITEM) {
    let updatedItem = state.filter((itemVal) => {
      return action.payload.p_id !== itemVal.p_id;
    });
    return updatedItem;
  }
  if (action.type == REFRESH_LIST) {
    console.log('called');
    return data
  }
  return state;
}
