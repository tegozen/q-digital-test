import React from 'react';
import { Text, View } from 'react-native';
import { Link } from "react-router-native";
import ROUTES from '../routes';

export default function Error404() {
  return (
    <View className="page">
      <Link to={ROUTES.main.path} className="button" title="Вернуться на главную">
        <Text>Вернуться на главную</Text>
      </Link>
    </View>
  )
}