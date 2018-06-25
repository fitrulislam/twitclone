import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import { observer } from 'mobx-react'

import SignedOut from './screens/signedOut/index';
import { isSignedIn } from './auth';
import { Tab } from './screens/signedIn/index';
import userStore from './store/user';
import Loading from './screens/others/Loading';
import Error from './screens/others/Error';

@observer export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  };

  componentDidMount() {
    userStore.onLoad();
    isSignedIn()
      .then(result => {
        if(result === true) {
          AsyncStorage.getItem('token')
            .then(res => {
              console.log('ambil data')
              userStore.onLoadSuccess();
              userStore.fetchDataUser(res);
              userStore.onSuccess();
            })
            .catch(err => {
              userStore.onError();
            })
        } else {
          userStore.onLoadSuccess();
        }
      })
      .catch(err => {
        userStore.onError();
      })
  };

  render() {
    if(userStore.loadingStatus === true) {
      return (
        <View style={styles.forLoading}>
          <Loading />
        </View>
      );
    } else if(userStore.errorStatus === true) {
      return (
        <View style={styles.forLoading}>
          <Error />
        </View>
      );
    } else {
      if(userStore.loginStatus === true) {
        return (
          <View style={styles.container}>
            <Tab />
          </View>
        );
      } else {
        return (
          <View style={styles.container}>
            <SignedOut />
          </View>
        );
      }
    }
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});