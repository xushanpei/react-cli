import { handleActions } from "redux-actions";
const defaultState = {
  data: 0,
  test: {}
};

// const homeReducer = (state = defaultState, action) => {
//   switch (action.type) {
//     case "ADDRECORD":
//       return Object.assign({}, state, {
//         data: action.payload.data
//       });

//     case "TEST_SUCCESS":
//       return Object.assign({}, state, {
//         test: action.data
//       });

//     default:
//       return state;
//   }
// };

const homeReducer = handleActions(
  {
    ["ADDRECORD"]: (state, action) => {
      return Object.assign({}, state, {
        data: action.payload.data
      });
    },

    ["TEST_SUCCESS"]: (state, action) => {
      console.log(action);
      return Object.assign({}, state, {
        test: action.data
      });
    }
  },
  defaultState
);

export default homeReducer;
