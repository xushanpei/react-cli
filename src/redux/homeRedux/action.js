// const actions = {
//   addRecord: data => ({ type: "ADDRECORD", data }),
//   delRecord: data => ({ type: "DELRECORD", data }),
//   test: data => ({ type: "TEST", data }),
//   test_success: data => ({ type: "TEST_SUCCESS", data })
// };
// export default actions;

import { createActions } from "redux-actions";

export const actionType = {
  ADDRECORD: "ADDRECORD",
  DELRECORD: "DELRECORD",
  TEST: "TEST",
  TEST_SUCCESS: "TEST_SUCCESS"
};

export default createActions({
  [actionType.ADDRECORD]: data => ({ data }),
  [actionType.DELRECORD]: data => ({ data }),
  [actionType.TEST]: data => ({ data }),
  [actionType.TEST_SUCCESS]: data => ({ data })
});
