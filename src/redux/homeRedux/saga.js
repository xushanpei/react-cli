import { call, put, takeEvery } from "redux-saga/effects";
import Api from "../../service/api";
import { message } from "antd";

function* test(action) {
  try {
    const data = yield call(Api.test);
    yield put({ type: "TEST_SUCCESS", data: data });
  } catch (error) {
    message.error("请求失败！");
  }
}

export default function* watchRoot() {
  yield takeEvery("TEST", test);
}
