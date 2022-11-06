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
export const db = firebase.firestore();
export const foodsRef = db.collection("Food");
export const menusRef = db.collection("Menu");
export const bannerRef = db.collection("banner");
export const settings = db.collection("settings");
export const ordersRef = db.collection('orders')


const firebaseConfig2 = {
  apiKey: "AIzaSyAQH3btIQyLc98JarvTD_bPD-GjeBON9dQ",
  authDomain: "orders-hotelmasterchef.firebaseapp.com",
  projectId: "orders-hotelmasterchef",
  storageBucket: "orders-hotelmasterchef.appspot.com",
  messagingSenderId: "424116459294",
  appId: "1:424116459294:web:09de90fff8b32d4e64db0f",
  measurementId: "G-S9DDHZD51J"
};

var orderDb = firebase.initializeApp(firebaseConfig2,'other');

export const db2 = orderDb.firestore()
export const settings2 = db2.collection("settings");
export const activeOrdersRef = db2.collection('activeOrders')
export const processOrdersRef = db2.collection('processOrders')