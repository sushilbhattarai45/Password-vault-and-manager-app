import React, { Component } from 'react';

import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SignUp from './components/signup';
import Login from './components/login';

import Splash from './components/main';
import Home from './components/homepage';
import Save from './components/savepass';

import Profile from './components/profile';
import Otp from './components/otp';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default class App extends React.Component {
  
  render() {
     
    return (


   <NavigationContainer>  
      <Stack.Navigator initialRouteName="splash"  screenOptions={{
    headerShown: false
  }}>     
     <Stack.Screen name="home" component={Home} />
     <Stack.Screen name="save" component={Save} />
     <Stack.Screen name="profile" component={Profile} />

        <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="splash" component={Splash} />
                <Stack.Screen name="otp" component={Otp} />

            <Stack.Screen name="Login" component={Login} />


      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
  },
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
    marginRight: 30,
    marginLeft: 30,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
