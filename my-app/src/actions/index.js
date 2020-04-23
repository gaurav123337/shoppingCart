import {
  ITEM_LIST, DELETE_ITEM, REFRESH_LIST, UPDATE_LIST
} from "./constants";

export function getItem(payload) {
  console.log(payload, "payload");
  return {
    type: ITEM_LIST,
    payload
  }
}

export function removeItem(payload) {
  console.log(payload, "payload");
  return {
    type: DELETE_ITEM,
    payload
  }
}

export function refresh(payload) {
  console.log(payload, "payload");
  return {
    type: REFRESH_LIST,
    payload
  }
}

export function updateList(payload) {
  console.log(payload, "payload");
  return {
    type: UPDATE_LIST,
    payload
  }
}
