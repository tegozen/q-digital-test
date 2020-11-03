/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/js/App';
import { name as appName } from './app.json';
import { Provider } from "react-redux";
import { createStore } from "redux";
import Redux from './src/js/redux';
import React from 'react';


const store = createStore(Redux.Reducers, Redux.InitialState);

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)


AppRegistry.registerComponent(appName, () => Wrapper);
