const defaultState = {
  data: 0
};

const homeReducer = (state = defaultState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADDRECORD":
      return Object.assign({}, state, {
        data: action.data
      });

    default:
      return state;
  }
};

export default homeReducer;
