import { AsyncStorage } from "react-native";

export const onSignIn = (token) => AsyncStorage.setItem('token', token);

export const onSignOut = () => AsyncStorage.removeItem('token');

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('token')
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};