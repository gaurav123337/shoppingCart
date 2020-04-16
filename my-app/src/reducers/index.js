import {
  combineReducers
} from 'redux';
import {
  getItemListReducer
} from './reducers';

const rootReducer = combineReducers({
  getItemList: getItemListReducer
})

export default rootReducer;
