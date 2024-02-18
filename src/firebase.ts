// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8xjzLxpvI89VJXccd_2k2Y_Iyl7qBcVs",
  authDomain: "linkforlife.firebaseapp.com",
  projectId: "linkforlife",
  storageBucket: "linkforlife.appspot.com",
  messagingSenderId: "314553010589",
  appId: "1:314553010589:web:2287eab6d2c2bd5bfbc774",
  measurementId: "G-KWCHXHJW5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, listAll, getDownloadURL };
