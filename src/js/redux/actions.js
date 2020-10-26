import * as actionTypes from './actionTypes';

//common: not debug, danger
export const setRedux = (state) => ({ type: actionTypes.SET_REDUX, ...state });

//single: use it pls
export const setTestSingleAction = (testSingleAction) => ({ type: actionTypes.SET_TESTSINGLEACTION, testSingleAction });