import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { onSignIn } from '../../auth';
import userStore from '../../store/user';
import twitStore from '../../store/twits';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      username: '',
      email: '',
      profile: '',
      password: '',
      errMsg: 'Please fill all fields'
    };
  };

  onButtonPress = () => {
    console.log(this.state)
    if(this.state.name !== '' && this.state.username !== '' && this.state.email !== '' && this.state.profile !== '' && this.state.password !== '') {
      axios.post('http://192.168.0.19:4000/user/signup', {
      name: this.state.name,
      username: this.state.username,
      email: this.state.email,
      profile: this.state.profile,
      password: this.state.password,
    })
      .then(response => {
        twitStore.resetTwits()
        onSignIn(response.data.token);
        userStore.onSuccess();
        userStore.fetchDataOnSuccess(response.data.user);
        twitStore.readOwnTwits(response.data.user._id)
      })
      .catch(err => {
        this.setState({
          errMsg: err.response.data.message
        })
        Alert.alert(this.state.errMsg)
      })
    } else {
      this.setState({
        errMsg: 'Please fill all fields'
      })
      Alert.alert(this.state.errMsg)
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <ScrollView keyboardShouldPersistTaps={'always'}>
          <View>
            <Text style={styles.title}>Register</Text>
          </View>
          <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Text>Displayed name (will be displayed on your profile)</Text>
            <TextInput style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              maxLength={20}
              placeholder='Name'
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}/>
            <Text>Username (for login)</Text>
            <TextInput style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              maxLength={15}
              placeholder='Username'
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}/>
            <Text>Profile (your short description)</Text>
            <TextInput style={styles.inputProfile}
              autoCapitalize="none"
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              maxLength={150}
              numberOfLines={3}
              multiline={true}
              placeholder='Profile'
              value={this.state.profile}
              onChangeText={(profile) => this.setState({ profile })}/>
            <Text>Email (must valid email)</Text>
            <TextInput style={styles.input}
              autoCapitalize="none"
              underlineColorAndroid='rgba(0,0,0,0)'
              autoCorrect={false}
              maxLength={30}
              placeholder='Email'
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}/>
            <Text>Password (must contain one letter, one number, one special case, and 8 character minimum)</Text>
            <TextInput style={styles.input}   
              returnKeyType="go"
              placeholder='Passwsord'
              underlineColorAndroid='rgba(0,0,0,0)'
              secureTextEntry
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}/>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onButtonPress()}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity> 
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    );
  };
};

const styles = StyleSheet.create({
  toScroll: {
    paddingBottom: 1000,
  },
  container: {
    borderWidth: 2,
		borderColor: 'transparent',
    margin: 10,
  },
  title: {
    borderWidth: 2,
		borderColor: 'transparent',
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input:{
    height: 38,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  inputProfile:{
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