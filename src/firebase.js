import * as firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDZX1aMmxvF2yhkFXkUNZfy3IhxlWm0sEg",
  authDomain: "tc-jenga.firebaseapp.com",
  databaseURL: "https://tc-jenga.firebaseio.com",
  projectId: "tc-jenga",
  storageBucket: "tc-jenga.appspot.com",
  messagingSenderId: "675508971680"
};
firebase.initializeApp(config);

export function dateToTimestamp(date) {
  return firebase.firestore.Timestamp.fromDate(date);
}

export const db = firebase.firestore();
const settings = {timestampsInSnapshots: true};
db.settings(settings);
