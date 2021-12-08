import React, { Component } from 'react';
import { Card, ListItem, Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Text,
  Image,
  ListView,
  ScrollView,
  View,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
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
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      data:[],
      lid: '',
      lname: '',
      lemail: '',
      pin:'',
    };
  }


  async componentDidMount()
  {
    // await AdMobInterstitial.setAdUnitID('ca-app-pub-9058660483713444/2177045274'); 
    // await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    // await AdMobInterstitial.showAdAsync();

  }
  async componentWillMount() {
 
    this.setState({ lid: await AsyncStorage.getItem('lid') });

    this.setState({ lname: await AsyncStorage.getItem('lname') });

    this.setState({ lemail: await AsyncStorage.getItem('lemail') });
  
  this.loadData();

  this.focusListener = this.props.navigation.addListener('focus', () => {
    this.loadData();
  });
  }
 loadData=async() =>
{
  
var data={
  id:this.state.lid,
    key:'sushil@009password',

}
  var url ='https://bhattaraisushil.info.np/api/api.php';
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

          if(response.status)
          {
  this.setState({data:response.data})
          }
          else
          {
            alert(response.status);
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
          <View style={{ alignItems: 'center', }}>
            <Pressable style={styles.profbutton} onPress={()=>this.props.navigation.navigate('profile')}>
              <FontAwesome name="user-secret" size={40} color="" />
              </Pressable>
            </View>
            <Card>
              <Card.Title style={{ textAlign: 'left' }}>
              Premium -   Hello {this.state.lname} 
              </Card.Title>
              <Card.Divider />
              <Text style={{}}>Want to Save a new Password ?</Text>
              <View style={{ marginTop: 20 }}>
                <Pressable style={styles.button} onPress={()=>this.props.navigation.navigate('save')}>
                  <Text style={styles.text}>Save A New Pass !! 👉</Text>
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
            <Card.Title style={{ textAlign: 'left' }}>Your Vault</Card.Title>
            <Card.Divider />
            <View style={{ marginTop: 10 }}>
<FlatList style={{}}data={this.state.data}
renderItem={({item})=> 


<Card>
                <Card.Title style={{ textAlign: 'left' }}>{item.title}</Card.Title>
                <Card.Divider />
                <View style={{}}>
                  <Text>Email : {item.email}</Text>
                  <Text>Password : {item.pass}</Text>
                </View>
              </Card>}

/>
          
              
             
            </View>
          </Card>

          <View>
            <Card>
              <Card.Title style={{ textAlign: 'left', textAlign: 'center' }}>
                This app is only made for educational purpose .Note that this
                app stores your data in encrypted form which means only you can
                read it. Please logout the App everytime you close the App for extra security.
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
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}>
                  Sushil Bhattarai
                </Text>
                
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Insta : @sushil_bhattarai45
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
   profbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 11,
    borderRadius: 4,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
