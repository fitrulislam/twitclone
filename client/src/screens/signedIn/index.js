import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import HomeScreen from './Timeline';
import SearchScreen from './Search';
import InputScreen from './Input';
import ProfileScreen from './Profile';

export const Tab = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ tintColor }) => <Image source={{uri: 'https://cdn3.iconfinder.com/data/icons/streamline-icon-set-free-pack/48/Streamline-18-512.png'}} style={ styles.icon } />
			}),
    },
    Search: {
      screen: SearchScreen,
      navigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ tintColor }) => <Image source={{uri: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png'}} style={ styles.icon } />
			}),
    },
    Input: {
      screen: InputScreen,
      navigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ tintColor }) => <Image source={{uri: 'https://cdn2.iconfinder.com/data/icons/large-svg-icons/512/import_document_mail_save-512.png'}} style={ styles.icon } />
			}),
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: ({ navigation }) => ({
				tabBarIcon: ({ tintColor }) => <Image source={{uri: 'https://cdn1.iconfinder.com/data/icons/freeline/32/account_friend_human_man_member_person_profile_user_users-512.png'}} style={ styles.icon } />
			}),
    },
  }, {
  initialRouteName: 'Home',
  activeTintColor: '#f0edf6',
  inactiveTintColor: 'black',
  barStyle: { backgroundColor: '#f4511e' },
  labeled: false,
});

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
});