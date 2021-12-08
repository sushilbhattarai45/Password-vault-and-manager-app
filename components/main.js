import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class Splash extends React.Component {

constructor()
{

  super();

  this.state={

  lid:'',
  }
}


 componentDidMount =async()=>
 {
  // await AdMobInterstitial.setAdUnitID('ca-app-pub-9058660483713444/2177045274'); 
  // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  // await AdMobInterstitial.showAdAsync();
 }
  componentWillMount =async ()=>
  {
        this.setState({ lid: await AsyncStorage.getItem('lid') });

      if(this.state.lid!==null)
    {
      this.props.navigation.navigate('otp');
    }
  }
  render() {
    
    return (



      
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#009387',
          flex: 1,
        }}>
        <View style={{ flex: 4, marginTop: 80, alignItems: 'center' }}>
                       <FontAwesome name="user-secret" size={200} color="black" />

            <Text style={{ marginTop: 20,marginLeft: 20 ,color:"white",fontSize: 20, fontWeight: 'bold' }}>
            Welcome Chief 🔒!!
          </Text>
        </View>
       
        <View
          style={{
            flex: 2,
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}>
        
 <Text style={{ marginTop: 40,marginLeft: 20 ,fontSize: 20, fontWeight: 'bold' }}>
             Lets Protect More 🔒🔒!!

   </Text>
          
<View style={{marginTop:30,       margin:30,}}>
       
<Pressable style={styles.button}   onPress={() =>this.props.navigation.navigate('SignUp')}>
      <Text style={styles.text}>Lets Go!!
      
 🔒
      </Text>
    </Pressable>
    </View>
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
