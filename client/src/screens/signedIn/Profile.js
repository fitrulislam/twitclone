import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { observer } from 'mobx-react';

import userStore from '../../store/user';
import twitStore from '../../store/twits';

@observer export default class Profile extends Component {
  logOut = () => {
    AsyncStorage.removeItem('token');
    console.log('keluar');
    userStore.onLogOut();
  };

  deleteData = (key) => {
    twitStore.removeTwit(userStore.user._id, key)
  }

  render() {
    let arr = twitStore.twits
    for(let i=1; i<arr.length; i++) {
      for(let j=0; j<i-1; j++) {
        let front = arr[j]
        let back = arr[i]
        if(arr[i].forSort > arr[j].forSort) {
          arr[i] = front
          arr[j] = back
        }
      }
    };
    console.log('biar jalan', arr)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.upperContent}>
            <Image source={{uri: 'http://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png'}} style={ styles.image } />
            <View style={styles.insideUpper}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText} onPress={() => this.logOut()}>
                  Log Out
                </Text>
              </TouchableOpacity>
              <Text>Followers</Text>
              <Text>{ userStore.user.followers.length }</Text>
              <Text>Following</Text>
              <Text>{ userStore.user.following.length }</Text>
            </View>
          </View>
          <View style={styles.lowerContent}>
            <Text style={styles.title}>{ userStore.user.name }</Text>
            <Text>{ userStore.user.profile }</Text>
          </View>
          <Text style={styles.titleTwo}>Your Tuit</Text>
          <View style={styles.text}>
            {
              arr.map((twit, index) => (
                <View key={index}>
                  <View style={styles.content}>
                    <Text style={styles.textContent} numberOfLines={5}>
                      { `${twit.content}` }
                    </Text>
                    <Text style={styles.time}>{ twit.createdAt }</Text>
                    <TouchableOpacity>
                      <Text
                        style={styles.forDelete}
                        onPress={() => this.deleteData(twit.key)}>
                        delete tuit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            }
          </View>
        </View>
      </ScrollView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'column'
  },
  upperContent: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 5,
  },
  insideUpper: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25,
  },
  lowerContent: {
    margin: 15,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  titleTwo: {
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  image: {
    margin: 5,
		width: 150,
		height: 150,
  },
  text: {
    flex: 1,
    margin: 15,
	},
	content: {
    marginBottom: 10,
    padding: 5,
		borderWidth: 0.5,
		borderColor: 'black',
  },
  button:{
    marginTop: 5,
    backgroundColor: '#f4511e',
    height: 30,
    width: 65,
    justifyContent: 'center',
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  forDelete: {
    color: 'red',
    alignSelf: 'flex-end',
  },
  textContent: {
    fontSize: 17,
    marginBottom: 5,
    fontStyle: 'italic'
  },
  time: {
    fontSize: 12,
  },
});