import * as actionTypes from './actionTypes';


export default (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_REDUX: {
      return { ...state, ...action }
    }
    case actionTypes.SET_TESTSINGLEACTION: {
      return {
        ...state,
        testSingleAction: action.testSingleAction
      }
    }
    default:
      return state
  }
};