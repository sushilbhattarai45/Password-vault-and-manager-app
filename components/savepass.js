import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

export default class Save extends React.Component {
   
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',
      Name: '',
      lid: '',
    };
  }
   componentDidMount = async () => {

    // await AdMobInterstitial.setAdUnitID('ca-app-pub-9058660483713444/2177045274'); 
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    // await AdMobInterstitial.showAdAsync();


    this.setState({ lid: await AsyncStorage.getItem('lid') });
    
     if(this.state.lid==null)
    {
      this.props.navigation.navigate('SignUp');
    }    
  };
  InsertRecord = async () => {
    this.setState({ lid: await AsyncStorage.getItem('lid') });

    var Name = this.state.Name;
    var Email = this.state.Email;
    var Password = this.state.Password;
 var Id =  this.state.lid;

    if (Name.length == 0 || Password.length == 0) {
      alert('RequiredField is missing or Short Input');
    } else {
      var InsertAPIURL = ''+this.state.lid;
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data = {
       id:Id,
        name: Name,
        email: Email,
        password: Password,
        key:'sushil@009password',
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          alert(response[0].message);
if(response[0].error==0)
{
  this.props.navigation.navigate('home');
}

        })
        .catch((error) => {
          alert('Error' + error);
        });
    }
  };
  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#009387',
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 20,
          }}>
          <Text
            style={{
              fontSize: 20,

              color: 'white',
              fontWeight: 'bold',
            }}>
            Enter your Data !!
          </Text>
        </View>
        <View
          style={{
            flex: 3,

            backgroundColor: 'white',
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 30 }}>
            App/Website Title
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="user-o"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Title"
              style={{
                borderBottomColor: 'red',
                borderWidth: 1,
                borderColor: 'white',
                flex: 3,
                marginRight: 30,
                height: 40,
              }}
              onChangeText={(Name) => this.setState({ Name })}
            />
          </View>
          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 15 }}>
            Email/Username
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Email(optional)"
              style={{
                borderBottomColor: 'red',
                keyboardType: 'email-address',

                height: 40,
                marginRight: 30,
                flex: 3,
                borderWidth: 1,
                borderColor: 'white',
              }}
              onChangeText={(Email) => this.setState({ Email })}
            />
          </View>
          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 15 }}>
            Password
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="user-secret"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              secureTextEntry={true}
              textContentType="emailAddress"
              placeholder="Password"
              style={{
                borderWidth: 1,
                borderColor: 'white',

                borderBottomColor: 'red',
                flex: 3,
                height: 40,
                marginRight: 30,
              }}
              onChangeText={(Password) => this.setState({ Password })}
            />
          </View>
          <View style={{ marginTop: 30, margin: 30 }}>
            <Pressable style={styles.button} onPress={this.InsertRecord}>
              <Text style={styles.text}>Store Data in Vault</Text>
            </Pressable>

             

          </View>
          
  <Pressable style={styles.cancelbutton} onPress={()=>this.props.navigation.navigate('home')}>
              <Text style={styles.text}>Cancel</Text>
            </Pressable>
          
            <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-2869778949274607/8604159734" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={this.bannerError} />
          
          </View>
      </View>
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
  cancelbutton: {
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
