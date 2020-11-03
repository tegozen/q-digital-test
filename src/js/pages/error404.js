import React from 'react';
import { Link } from "react-router-dom";
import ROUTES from '../routes';

export default function Error404() {
  return (
    <div className="page">
      <Link to={ROUTES.main.path} className="button" title="Вернуться на главную">Вернуться на главную</Link>
    </div>
  )
}