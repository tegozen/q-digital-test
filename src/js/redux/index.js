
import * as ActionTypes from './actionTypes';
import * as Actions from './actions';
import Reducers from './reducers';
import InitialState from './initialState';
import { connect } from 'react-redux';

export const Connect = (component_, customState, customMethods) => {
  //customState all state by default (state) => state
  //customMethods only setRedux by default (dispatch) => ({ somemethod: (state) => dispatch(someaction(state) ) })
  return connect(
    (state) => {
      let newState = {};
      Object.keys(state).forEach((key) => {
        if (key !== "type") {
          newState[key] = state[key];
        }
      });
      if (customState) {
        newState = { ...newState, ...customState }
      }
      return newState;
    },
    (dispatch) => {
      let methods = {
        setRedux: (state) => dispatch(Actions.setRedux(state))
      };

      if (customMethods) {
        methods = { ...methods, ...customMethods() }
      }

      return methods
    }
  )(component_);
}

export const Redux = {
  ActionTypes,
  Actions,
  Reducers,
  InitialState,
  Connect
};
export default Redux;