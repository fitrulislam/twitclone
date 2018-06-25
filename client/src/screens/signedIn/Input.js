import React, { Component } from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import twitStore from '../../store/twits';
import userStore from '../../store/user';

export default class Input extends Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };
  };

  addData = () => {
    twitStore.addTwit(userStore.user._id, {
      content: this.state.content,
      username: userStore.user.username,
      forSort: Date.now(),
      createdAt: new Date(Date.now()).toLocaleString(),
      userId: userStore.user._id
    });
    this.setState({
      content: ''
    });
    this.props.navigation.navigate('Home')
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Add Twit</Text>
        <TextInput style = {styles.input}
          autoCapitalize="none"
          underlineColorAndroid='rgba(0,0,0,0)'
          autoCorrect={false}
          maxLength={150}
          numberOfLines={5}
          multiline={true}
          returnKeyType="next"
          placeholder='Write something here...'
          value={this.state.content}
          onChangeText={(content) => this.setState({ content })}/>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => this.addData()}>
            Twit!
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input:{
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: 250,
    borderColor: 'black',
  },
  title: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  button:{
    marginTop: 5,
    backgroundColor: '#2980b6',
    height: 30,
    width: 57,
    justifyContent: 'center',
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
});