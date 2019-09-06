import { createStore, combineReducers } from "redux";
import homeReducer from "./homeRedux/reducer";

//合并所有reducer 存入 store
const reducers = combineReducers({
  homeReducer
});

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
