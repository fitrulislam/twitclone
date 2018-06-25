import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class TwitList extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.username}>{ `@${this.props.twit.item.username}` }</Text>
          <Text style={styles.content} numberOfLines={5}>{ this.props.twit.item.content }</Text>
          <Text style={styles.time}>{ this.props.twit.item.createdAt }</Text>
        </View>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  content: {
    marginLeft: 10,
    fontSize: 15,
    marginBottom: 5,
    fontStyle: 'italic'
  },
  time: {
    fontSize: 12,
  },
});