import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ROUTES from './routes';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {Object.keys(ROUTES).map((name, key) => <Route {...ROUTES[name]} key={key} />)}
        </Switch>
      </Router>
    )
  }
}

export default App