import React from 'react';
import { Connect } from './redux';

export class App extends React.Component {
  render() {
    console.log(this.props)
    return false
  }
}

export default Connect(App)