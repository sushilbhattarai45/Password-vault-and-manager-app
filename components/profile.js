import React, { Component } from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import {
  Text,
  Image,

  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Pressable,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      did:'',
      lid: '',
      lname: '',
      lemail: '',
    };
  }

  async componentDidMount() {

    this.setState({ lid: await AsyncStorage.getItem('lid') });
    this.setState({ lname: await AsyncStorage.getItem('lname') });

    this.setState({ lemail: await AsyncStorage.getItem('lemail') });

    this.loadData();

    await AdMobInterstitial.setAdUnitID('ca-app-pub-2869778949274607/7941868659'); 
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();


  }
  loadData = async () => {
    this.setState({ lid: await AsyncStorage.getItem('lid') });

    if(this.state.lid==null)
    {
      this.props.navigation.navigate('SignUp');

    }
    else
    {
    var data = {
      id: this.state.lid,
      key: 'sushil@009password',
    };
    var url = '';
    var headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };


    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status) {
          this.setState({ data: response.data });
        } else {
          alert(response.status);
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
 await AsyncStorage.removeItem('lname');
 await AsyncStorage.removeItem('lemail');
alert("You Are Logged Out");
  
 
    this.props.navigation.navigate('SignUp');

  }

     async deleteData(id)
   {
     var url="https://bhattaraisushil.info.np/api/deleteapi.php";
     var data = {
      id: id,
      key: 'sushil@009password',
    };
     var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      })
       .then((response) => response.json())
        .then((response) => {
          alert(response[0].message);
          if (response[0].error == 0) {
            this.props.navigation.navigate('home');
          }
        })
        .catch((error) => {
          alert('Error' + error);
        });
   }

  render() {
    return (
      <ScrollView style={{}}>
        <View
          style={{
            backgroundColor: '#009387',
            position: 'relative',
            paddingBottom: 30,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}>
          <View style={{ marginTop: 40 }}>
           
          
            <Card>
              <Card.Title style={{ textAlign: 'left' }}>
               Premium -  Hello {this.state.lname}
              </Card.Title>
              <Card.Divider />
              <Text style={{}}>Name: {this.state.lname}</Text>
              <Text style={{}}>Email: {this.state.lemail}</Text>
              <Text style={{}}>Registration Id: {this.state.lid}</Text>
              <View style={{ marginTop: 20 }}>
                <Pressable style={styles.button} onPress={this.logout}
>
                  <Text style={styles.text}>Logout 👉</Text>
                </Pressable>
              </View>
            </Card>
          </View>
        </View>
        <View
          style={{
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: 30,
          }}>
          <Card style={{ paddingBottom: 60, position: 'relative' }}>
            <Card.Title style={{ textAlign: 'left' }}>
              Delete your Vault?
            </Card.Title>
            <Card.Divider />
            <View style={{ marginTop: 10 }}>
              <FlatList
                style={{}}
                data={this.state.data}
                renderItem={({ item }) => (
                  <Card>
                  <View  style={{justifyContent:"center"}}>
                       
                   
                       
                          <Text style={{float:"left"}}> {item.title}</Text>
                          
                 
                        <Entypo
                        style={{textAlign:"right",marginTop:-20,}}
                            name="circle-with-cross"
                            size={24}
                            onPress={()=>this.deleteData(item.id)}
                            color="red"
                          />
                          

                     
                    
                                         

                
                                                  </View>


                    <Card.Divider />
                    <View style={{}}>
                      <Text>Email : {item.email}</Text>
                      <Text>Password : {item.pass}</Text>
                    </View>
                  </Card>
                )}
              />
            </View>
          </Card>

          <View>
            <Card>
              <Card.Title style={{ textAlign: 'left', textAlign: 'center' }}>
                This app is only made for educational purpose .Note that this
                app stores your data in encrypted form which means only you can
                read it.
              </Card.Title>
              <Card.Divider />
              <View style={{}}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                  The Next It Solutions
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  info.sushilbhattarai@gmail.com
                </Text>

                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Sushil Bhattarai
                </Text>
              </View>
            </Card>

            <AdMobBanner
  bannerSize="fullBanner"
  adUnitID="ca-app-pub-2869778949274607/8604159734" // Test ID, Replace with your-admob-unit-id
  servePersonalizedAds // true or false
  onDidFailToReceiveAdWithError={this.bannerError} />
          </View>
        </View>
      </ScrollView>
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
  deletebutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    borderRadius: 30,
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
