import React, { Component } from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Otp extends React.Component {
  constructor() {
    super();
    this.getData;

    this.state = {
      Pin: '',
 
      lid: '',
      lname: '',
      lemail: '',
    };
  } 
  componentDidMount = async () => {

    // await AdMobInterstitial.setAdUnitID('ca-app-pub-9058660483713444/2177045274'); 
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    // await AdMobInterstitial.showAdAsync();



    this.setState({ lid: await AsyncStorage.getItem('lid') });
    this.setState({ lemail: await AsyncStorage.getItem('lemail') });
    this.setState({ lname: await AsyncStorage.getItem('lname') });


     this.loadData();

  this.focusListener = this.props.navigation.addListener('focus', () => {
    this.loadData();
  });
  
  };
   
   
   loadData=async()=>{



    // this.setState({ lid: await AsyncStorage.getItem('lid') });
    // this.setState({ lemail: await AsyncStorage.getItem('lemail') });
    // this.setState({ lname: await AsyncStorage.getItem('lname') });




    if(this.state.lid==null)
    {
      this.props.navigation.navigate('Login');
    }
     }

  CheckRecord =async () => {

    this.setState({ lid: await AsyncStorage.getItem('lid') });

    var Pin = this.state.Pin;

    var Id = this.state.lid;
    if (Pin.length <4) {
      alert('Short Input');
    } else {
      var InsertAPIURL = 'https://bhattaraisushil.info.np/api/checkpin.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data = {
        pin: Pin,
        id: Id,
        key:'sushil@009password',
      };
      fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {

         storepin= async()=>
          {
            await AsyncStorage.setItem('pin', this.state.Pin);

          }
        
if(response[0].errorstate==0){
     alert(response[0].message);
this.storepin;
      this.props.navigation.navigate('home');
    }
    else
    {
        alert(response[0].message);
    }


          
        })
        .catch((error) => {
          alert('Error' + error);
        });
    }
  };
  logout=async()=>
  {
 
 await AsyncStorage.removeItem('lid');
 await AsyncStorage.removeItem('pin');

 await AsyncStorage.removeItem('lname');
 await AsyncStorage.removeItem('lemail');
alert("You Are Logged Out");

 
    this.props.navigation.navigate('SignUp');

  


  }

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
            Please Provide  Pin for  {this.state.lemail}!
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
            Pin( 2 Step Verification)
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Pin"
              style={{
                borderBottomColor: 'red',
                keyboardType: 'numeric',

                height: 40,
                marginRight: 30,
                flex: 3,
                borderWidth: 1,
                borderColor: 'white',
              }}
              onChangeText={(Pin) => this.setState({ Pin })}
            />
          </View>

        

          <View style={{ marginTop: 30, margin: 30 }}>
            <Pressable style={styles.loginbutton} onPress={this.CheckRecord}>
              <Text style={styles.text}>Confirm Pin</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.signupbutton}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.text}>Cancel</Text>
          </Pressable>
          <Pressable
            style={styles.logoutbutton}
            onPress={this.logout}>
            <Text style={styles.text}>Logout from this account</Text>
          </Pressable>
        </View>
        <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-2869778949274607/8604159734" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={this.bannerError} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
  },
  signupbutton: {
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
  logoutbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginTop:30,
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
