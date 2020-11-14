import firebase from "firebase/app";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyBhyKn2xUSuwE10-xYZTWVmO0zwyGVKw1Y",
  authDomain: "auth-development-8785b.firebaseapp.com",
  databaseURL: "https://auth-development-8785b.firebaseio.com",
  projectId: "auth-development-8785b",
  storageBucket: "auth-development-8785b.appspot.com",
  messagingSenderId: "20704998425",
  appId: "1:20704998425:web:14f7dd4850f26201b02688"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export const auth = firebase.app().auth();
