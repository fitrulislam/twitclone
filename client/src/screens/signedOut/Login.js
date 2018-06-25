import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  AsyncStorage,
  Alert
} from 'react-native';
import axios from 'axios';

import userStore from '../../store/user';
import twitStore from '../../store/twits';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errMsg: ''
    };
  };

  onButtonPress = () => {
    console.log('login')
    axios.post('http://user-tuitclone.roarized.com/user/signin', {
      username: this.state.username,
      password: this.state.password
    })
      .then(response => {
        twitStore.resetTwits()
        AsyncStorage.setItem('token', response.data.token);
        userStore.onSuccess();
        userStore.fetchDataOnSuccess(response.data.user);
        twitStore.readOwnTwits(response.data.user._id);
      })
      .catch(err => {
        this.setState({
          username: '',
          password: '',
          errMsg: err.response.data.message
        })
        Alert.alert(this.state.errMsg)
      })
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <Text style={styles.title}>Twitclone Login</Text>
        <View style={styles.container}>
          <StatusBar barStyle="light-content"/>
          <TextInput style = {styles.input}
            autoCapitalize="none"
            underlineColorAndroid='rgba(0,0,0,0)'
            autoCorrect={false}
            returnKeyType="next"
            placeholder='Username'
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}/>
          <TextInput style = {styles.input}   
            returnKeyType="go"
            placeholder='Password'
            underlineColorAndroid='rgba(0,0,0,0)'
            secureTextEntry
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}/>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => this.onButtonPress()}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity> 
        </View>
        <TouchableOpacity>
          <Text
            style={styles.info}
            onPress={() => this.props.navigation.navigate('Register')}
          >Or create an account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
		borderColor: 'transparent',
    margin: 10,
  },
  title: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  info: {
    marginLeft: 10,
    color: 'blue',
    fontSize: 17,
  },
  input:{
    height: 38,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  buttonContainer:{
    backgroundColor: '#f4511e',
    paddingVertical: 15,
    height: 40,
    justifyContent: 'center',
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }, 
});