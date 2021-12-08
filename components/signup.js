import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

export default class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      Email: '',
      Password: '',
      Name: '',
      Contact: '',
      lid: '',
      pin:'',
    };
  }
  componentDidMount = async () => {
    await AdMobInterstitial.setAdUnitID('ca-app-pub-2869778949274607/7941868659'); 
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();

    
    this.setState({ lid: await AsyncStorage.getItem('lid') });
    this.setState({ pin: await AsyncStorage.getItem('pin') });
    await AsyncStorage.removeItem('pin');
    this.loadData();

    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.loadData();
    });
  };

  loadData=async()=> {
    
    this.setState({ lid: await AsyncStorage.getItem('lid') });
    this.setState({ pin: await AsyncStorage.getItem('pin') });
    if (this.state.lid !== null ) {
      this.props.navigation.navigate('otp');
    }
  }

  InsertRecord = () => {
    var Name = this.state.Name;
    var Email = this.state.Email;
    var Contact = this.state.Contact;
    var Password = this.state.Password;
    var Pin = this.state.Pin;

    if (
      Name.length == 0 ||
      Email.length == 0 ||
      Password.length < 8 ||
      Contact.length < 10 ||
      Pin.length < 4
    ) {
      alert('RequiredField is missing or Short Input');
    } else {
      var InsertAPIURL = '';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var data = {
        name: Name,
        email: Email,
        password: Password,
        contact: Contact,
        pin:Pin,
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
          
      
          if(response[0].errorstate==0)
          {
            alert('You can  now login from Login Screen');

            
            this.props.navigation.navigate('Login');
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
         flex:0.2,
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
            Please Sign Up !!
          </Text>
        </View>
        <ScrollView
          style={{
            flex: 6,

            backgroundColor: 'white',
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 30 }}>
            Name
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="user-o"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Name"
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

          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 30 }}>
            Contact
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="phone"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="Contact"
              keyboardType="numeric"
              style={{
                marginRight: 30,
                borderBottomColor: 'red',
                borderWidth: 1,
                borderColor: 'white',
                flex: 3,
                height: 40,
              }}
              onChangeText={(Contact) => this.setState({ Contact })}
            />
          </View>

          <Text style={{ marginLeft: 15, fontSize: 11, marginTop: 30 }}>
             4 Digit Pin
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome
              name="lock"
              size={20}
              style={{ paddingRight: 10, paddingLeft: 10 }}
              color="black"
            />
            <TextInput
              placeholder="  4 Digit Pin"
              keyboardType="numeric"
              style={{
                marginRight: 30,
                borderBottomColor: 'red',
                borderWidth: 1,
                borderColor: 'white',
                flex: 3,
                height: 40,
              }}
              onChangeText={(Pin) => this.setState({ Pin })}
            />
          </View>


          <View style={{ marginTop: 30, margin: 30 }}>
            <Pressable style={styles.button} onPress={this.InsertRecord}>
              <Text style={styles.text}>Sign Up!!</Text>
            </Pressable>
          </View>

          <Pressable
            style={styles.loginbutton}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.text}>Login!!</Text>
          </Pressable>

          <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-2869778949274607/8604159734" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={this.bannerError} />
        </ScrollView>
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
