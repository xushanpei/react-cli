const actions = {
  addRecord: data => ({ type: "ADDRECORD", data }),
  delRecord: data => ({ type: "DELRECORD", data }),
  test: data => ({ type: "TEST", data }),
  test_success: data => ({ type: "TEST_SUCCESS", data })
};
export default actions;
