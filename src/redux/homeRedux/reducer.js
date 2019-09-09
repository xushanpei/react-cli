const defaultState = {
  data: 0,
  test: {}
};

const homeReducer = (state = defaultState, action) => {
  console.log(action.type);
  switch (action.type) {
    case "ADDRECORD":
      return Object.assign({}, state, {
        data: action.data
      });

    case "TEST_SUCCESS":
      return Object.assign({}, state, {
        test: action.data
      });

    default:
      return state;
  }
};

export default homeReducer;
