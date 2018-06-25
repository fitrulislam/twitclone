import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Alert
} from 'react-native';
import axios from 'axios';
import { observer } from 'mobx-react';

import userStore from '../../store/user';

@observer export default class MainList extends Component {
  updatedFollow = (id) => {
    AsyncStorage.getItem('token')
      .then(res => {
        axios.post('http://192.168.0.19:4000/user/following', {
          followerId: id
        }, {
          headers: {
            token: res
          }
        })
          .then(response => {
            userStore.updateFollow(id);
          })
          .catch(err => {
            Alert.alert(err.response.data.message);
          })
      })
      .catch(err => {
        Alert.alert('something went wrong');
      })
  };

  updatedUnfollow = (id) => {
    AsyncStorage.getItem('token')
      .then(res => {
        axios.post('http://192.168.0.19:4000/user/unfollow', {
          followerId: id
        }, {
          headers: {
            token: res
          }
        })
          .then(response => {
            userStore.updateUnfollow(id);
          })
          .catch(err => {
            Alert.alert(err.response.data.message)
          })
      })
      .catch(err => {
        Alert.alert('something went wrong');
      })
  };

  render() {
    let count = 0;
    userStore.user.following.map(userId => {
      userId === this.props.user.item._id && (count++)
    });
    return (
      <View>
        { 
          this.props.user.item._id !== userStore.user._id &&
          (
            <View style={styles.container}>
              <Text style={styles.username}>{ `@${this.props.user.item.username}` }</Text>
              <Text style={styles.name}>{ this.props.user.item.name }</Text>
              <Text style={styles.profile}>{ this.props.user.item.profile }</Text>
              {
                count === 0 ?
                <TouchableOpacity style={styles.buttonContainerFollow}>
                  <Text onPress={() => this.updatedFollow(this.props.user.item._id)} style={styles.buttonText}>Follow</Text>
                </TouchableOpacity> :
                <TouchableOpacity style={styles.buttonContainerUnfollow}>
                  <Text onPress={() => this.updatedUnfollow(this.props.user.item._id)} style={styles.buttonText}>Unfollow</Text>
                </TouchableOpacity>
              }
            </View>
          )
        }
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
  },
  username: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  name: {
    marginLeft: 10,
    fontSize: 15,
  },
  profile: {
    marginLeft: 10,
    fontSize: 13,
    fontStyle: 'italic'
  },
  buttonContainerFollow:{
    marginTop: 5,
    backgroundColor: '#2980b6',
    height: 30,
    width: 57,
    justifyContent: 'center',
  },
  buttonContainerUnfollow:{
    marginTop: 5,
    backgroundColor: '#2980b6',
    height: 30,
    width: 66,
    justifyContent: 'center',
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
});