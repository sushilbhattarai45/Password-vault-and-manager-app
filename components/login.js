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

export default class Login extends React.Component {
  constructor() {
    super();
    this.getData;

    this.state = {
      Email: '',
      Password: '',
      lid: '',
      lname: '',
      pin:'',
      lemail: '',
    };
  } 
  componentDidMount = async () => {

    // await AdMobInterstitial.setAdUnitID('ca-app-pub-9058660483713444/2177045274'); 
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    // await AdMobInterstitial.showAdAsync();  
    this.setState({ lid: await AsyncStorage.getItem('lid') });

    this.setState({ pin: await AsyncStorage.getItem('pin') });
   

    this.loadData();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.loadData();
  });
  
  };
   
   
   loadData =async ()=>{

    this.setState({ lid: await AsyncStorage.getItem('lid') });


    if (this.state.lid !== null) {
      this.props.navigation.navigate('otp');
    }
  
  
     }

  CheckRecord =async () => {
    var Email = this.state.Email;

    var Password = this.state.Password;
    if (Email.length == 0 || Password.length < 8) {
      alert('RequiredField is missing or Short Input');
    } else {
      var InsertAPIURL = '';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data = {
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
          

          const StoreData = async () => {
            try {
              await AsyncStorage.setItem('lid', response[0].id);
              await AsyncStorage.setItem('lname', response[0].name);

              await AsyncStorage.setItem('lemail', response[0].email);

              this.setState({ lid: await AsyncStorage.getItem('lid') });
              this.setState({ lname: await AsyncStorage.getItem('lname') });

              this.setState({ lemail: await AsyncStorage.getItem('lemail') });

            } catch (e) {}
          };
if(response[0].error==0){
     alert(response[0].message);


StoreData();
      this.props.navigation.navigate('otp');
  

}
else{
 alert(response[0].message +response[0].prob+ response[0].error);

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
            Please Log In {this.state.Id}!
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
            Email
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name="email-outline"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Email"
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
            <Pressable style={styles.loginbutton} onPress={this.CheckRecord}>
              <Text style={styles.text}>Login!!</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.signupbutton}
            onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.text}>Sign Up!!</Text>
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
