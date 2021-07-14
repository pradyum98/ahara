import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCQomOAxL0oRH7vYpuCXwhrQ1fWRzO2qW0",
  authDomain: "ahara-b0403.firebaseapp.com",
  databaseURL: "https://ahara-b0403.firebaseio.com",
  projectId: "ahara-b0403",
  storageBucket: "ahara-b0403.appspot.com",
  messagingSenderId: "601848970227",
  appId: "1:601848970227:android:5b8e86e781a92be929f086",
  //   measurementId: 'G-measurement-id',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
