import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, FlatList } from 'react-native';
import { observer } from 'mobx-react';
import axios from 'axios';

import userStore from '../../store/user';
import TwitList from './TwitList';
import Loading from '../others/Loading';
import { isSignedIn } from '../../auth';
import { db } from '../../store/firebase';

@observer export default class Timeline extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      twits: [],
      refreshing: false
    };
  };

  fetchData = () => {
    this.setState({
      twits: []
    })
    isSignedIn()
      .then(result => {
        if(result === true) {
          AsyncStorage.getItem('token')
            .then(res => {
              axios.get('http://192.168.0.19:4000/user/oneuser', {
                headers: {
                  token: res
                }
              })
                .then(response => {
                  let arr = [...response.data.user.following, response.data.user._id];
                  this.readOtherTwit(arr);
                })
                .catch(err => {
                  console.log('gagal ambil data');
                })
            })
            .catch(err => {
              console.log('gagal get item');
            })
        } else {
          userStore.onLoadSuccess();
        }
      })
      .catch(err => {
        console.log('gagal signed in');
      })
  }

  readOtherTwit = (arr) => {
    for(let i=0; i<arr.length; i++) {
      db.ref(`user/${arr[i]}`).on('value', (snapshot) => {
        if(snapshot.val()) {
          let rawPass = snapshot.val();
          let arr = [];
          for (let key in rawPass) {
            if (rawPass.hasOwnProperty(key)) {
              let el = rawPass[key]
              let newPass = {...el, key: key}
              arr.push(newPass)
            }
          }
          for(let k=0; k<arr.length; k++) {
            this.setState({
              twits: [...this.state.twits, arr[k]],
              refreshing: false,
              loading: false
            })
          }
        }
      }) 
    }
  };

  componentDidMount() {
    this.fetchData()
  };

  _keyExtractor = (twit, index) => index.toString();

  handleRefresh = () => {
    this.setState({
      refreshing: true,
      twits: []
    }, () => {
      this.fetchData()
    })
  }

  render() {
    if(this.state.loading === true) {
      return (
        <View style={styles.forLoading}>
          <Text>
            Follow someone or tuit something!
          </Text>
        </View>
      );
    } else {
      let arr = this.state.twits;
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
      return (
        <View>
          <Text style={styles.title}>
            Tuits
          </Text>
          <View style={{marginBottom: 150}}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.handleRefresh()}
              data={ arr }
              keyExtractor={ this._keyExtractor }
              renderItem={( twit ) => <TwitList twit={ twit }/> }
            />
          </View>
        </View>
      );
    };
  };
};

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  forLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});