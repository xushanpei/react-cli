import { createStore, combineReducers, applyMiddleware } from "redux";
import { fork, all } from "redux-saga/effects";
import createSagaMiddleware from "redux-saga";
//引入 reducer
import homeReducer from "./homeRedux/reducer";

//引入 saga
import homeSaga from "./homeRedux/saga";

//合并所有reducer 存入 store
const reducers = combineReducers({
  homeReducer
});

//合并所有的saga
function* rootSaga() {
  yield all([fork(homeSaga)]);
}

/**
 * createStore 第一个参数所有reducer的集合
 */
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
