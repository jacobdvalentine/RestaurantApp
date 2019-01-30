import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { dishes } from './assets/dishes.json';
import 'bootstrap/dist/css/bootstrap.css';
import _ from "underscore";
import uuid from "uuid";

var uniqueDishes = _.map(dishes, function(dish) {
     dish.uuid = uuid();

     return dish;
})


ReactDOM.render(<App dishes={uniqueDishes} />, document.getElementById('root'));
