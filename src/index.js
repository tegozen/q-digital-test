import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from "redux";
import Redux from './js/redux';
import './scss/index.scss';

const store = createStore(Redux.Reducers, Redux.InitialState);

const Wrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <React.StrictMode>
    <Wrapper />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
