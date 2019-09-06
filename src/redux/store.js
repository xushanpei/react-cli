import { createStore, combineReducers } from "redux";
import homeReducer from "./homeRedux/reducer";

//合并所有reducer 存入 store
const reducers = combineReducers({
  homeReducer
});

/**
 * createStore 第一个参数所有reducer的集合，第二个参数 redux 调试工具，可选项
 */
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
