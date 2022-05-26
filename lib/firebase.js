import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWCPEYOGTrTnxgpYvmF30yEXUxES6aTAo",
  authDomain: "dev-chu.firebaseapp.com",
  projectId: "dev-chu",
  storageBucket: "dev-chu.appspot.com",
  messagingSenderId: "588823301517",
  appId: "1:588823301517:web:16093d60328b58117341c4",
};

// Initialize Firebase app (connects React app to the cloud)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
