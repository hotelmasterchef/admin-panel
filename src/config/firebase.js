import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCsF5sBuYQql_gvgoif9KchKM5xQmoxIrw",
  authDomain: "hotel-masterchef.firebaseapp.com",
  projectId: "hotel-masterchef",
  storageBucket: "hotel-masterchef.appspot.com",
  messagingSenderId: "292612180399",
  appId: "1:292612180399:web:dcd7b5525825f58d90075a",
  measurementId: "G-JMCPW0VP2J"
};
// initialize app
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
// export const db = firebase.firestore();
// export const foodsRef = db.collection("Food");
// export const menusRef = db.collection("Menu");
