import firebase from "firebase";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAiGcDs0JP7wtp2c48awHCG6G6-qdH5HL0",
  authDomain: "highlights-app-16b2b.firebaseapp.com",
  projectId: "highlights-app-16b2b",
  storageBucket: "highlights-app-16b2b.appspot.com",
  messagingSenderId: "138327443836",
  appId: "1:138327443836:web:9884165e39668f5981fcf9",
  measurementId: "G-GJ48KSJRN7",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  console.log("Firebase initialization error");
}

export default firebase;
