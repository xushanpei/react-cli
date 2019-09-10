import { call, put, takeEvery } from "redux-saga/effects";
import Api from "../../service/api";
import { message } from "antd";

function* test(action) {
  try {
    //触发 Api.test 请求
    const data = yield call(Api.test);
    //创建 yield 一个 dispatch Effect
    yield put({ type: "TEST_SUCCESS", data: data });
  } catch (error) {
    message.error("请求失败！");
  }
}

export default function* watchRoot() {
  //监听如果有调用 TEST 的action的话，就会触发 test
  yield takeEvery("TEST", test);
}
