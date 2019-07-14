import React from 'react';
import Navigator from './config/Navigation'
import {Button, Platform,StyleSheet, Text, View ,TouchableOpacity,Image} from 'react-native';
import MapView from 'react-native-maps'
import {MarkerAnimated} from 'react-native-maps'
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class App extends React.Component{
  state={
    start:true
  }

 render()
{
  return(
    <Navigator/>
  )
}
}

