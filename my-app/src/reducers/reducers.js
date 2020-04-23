import {
  ITEM_LIST, DELETE_ITEM, REFRESH_LIST, UPDATE_LIST
} from "../actions/constants";
 import data from "../../src/data.js";

const initialData = JSON.stringify(data);


export function getItemListReducer(state = data, action) {
  if (action.type == DELETE_ITEM) {
    let updatedItem = state.filter((itemVal) => {
      return action.payload.p_id !== itemVal.p_id;
    });
    return updatedItem;
  }
  if (action.type == REFRESH_LIST) {
    console.log(data, "data")
    return JSON.parse(initialData);
  }
  // if (action.type == UPDATE_LIST) {
  //   let updatedList = state.map((itemVal) => {
  //     if(itemVal.p_id === action.payload.p_id){
  //       itemVal.p_price = action.payload.p_price;
  //       itemVal.selectedColor = action.payload.color;
  //     }
  //     return itemVal;
  //   });
  //   return updatedList;
  // }
  if (action.type == UPDATE_LIST) {
    let updatedList = state.map((itemVal) => {
      if(itemVal.p_id === action.payload.p_id){
          return {
          ...itemVal,
          p_price: action.payload.p_price
        };
      }
      console.log(itemVal, "itemVal")
      return itemVal;
    });
    console.log(updatedList, "itemVal updatedList")
    return updatedList;
  }
  return state;
}
