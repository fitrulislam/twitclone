import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { GET_ALL_USERS } from '../../../graphql/queryType';
import { Query } from 'react-apollo';

import MainList from './MainList';
import Loading from '../others/Loading';
import Error from '../others/Error';

export default class Search extends Component {
  _keyExtractor = (user) => user._id;

  render() {
    { console.log('ambil data dari search') }
    return (
      <Query query={ GET_ALL_USERS }>
          {({ loading, error, data }) => {
            console.log(data)
            console.log(error)
            if (loading) return <Loading />
            if (error) return <Error />
            return (
              <View>
                <Text style={styles.title}>
                  Tuips
                </Text>
                <FlatList
                  data={ data.users }
                  keyExtractor={ this._keyExtractor }
                  renderItem={( user ) => <MainList user={ user }/> }
                />
              </View>
              )
            }}
        </Query>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    marginLeft: 15,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});