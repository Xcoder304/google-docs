// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEZh4l2rLkNG2yZ3RF_0s_K6PubdQ30Fw",
  authDomain: "docs-41aa5.firebaseapp.com",
  projectId: "docs-41aa5",
  storageBucket: "docs-41aa5.appspot.com",
  messagingSenderId: "174658799692",
  appId: "1:174658799692:web:465e55eb5d56cb32750ce9",
  measurementId: "G-K91KQZDTYW",
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
