import {View, Text} from 'react-native';
import React from 'react';
import {combineReducers} from 'redux';
import homeReducer from '../pages/Home/homeSlice';

const rootReducer = combineReducers({
  homeReducer,
});

export default rootReducer;
