import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Loading extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://i.pinimg.com/originals/ac/44/71/ac4471291c620d8dd47697a1d8da4975.gif'}} style={ styles.icon } />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 300,
    height: 300,
  },
});