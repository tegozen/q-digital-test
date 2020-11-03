import React from 'react';
import { NativeRouter, Route, Switch } from "react-router-native";
import ROUTES from './routes';

export class App extends React.Component {
  render() {
    return (
      <NativeRouter>
        <Switch>
          {Object.keys(ROUTES).map((name, key) => <Route {...ROUTES[name]} key={key} />)}
        </Switch>
      </NativeRouter>
    )
  }
}

export default App