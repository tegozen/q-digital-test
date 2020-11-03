import React from 'react';
import { View, Text } from 'react-native';
import { Link } from "react-router-native";
import style from '../../scss';
import ROUTES from '../routes';

export default class Main extends React.Component {
  render() {
    return (
      <View style={style.page}>
        <Text style={style.text}>hello</Text>
        <Link to={ROUTES.slider.path} style={style.button} title="Слайдер">
          <Text style={style.button__text}>Слайдер</Text>
        </Link>
      </View>
    )
  }
}