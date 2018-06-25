import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDiVjq2Hh7PHOmQrVO3MG0tkBVX6VK0KsM',
	authDomain: 'twitclone-208204.firebaseapp.com',
	databaseURL: 'https://twitclone-208204.firebaseio.com',
	projectId: 'twitclone-208204',
	storageBucket: 'twitclone-208204.appspot.com',
	messagingSenderId: '655682750014'
};

firebase.initializeApp(config);

export default firebase;

export const db = firebase.database();
export const auth = firebase.auth();