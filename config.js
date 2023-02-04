import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8zqPghC71nKtyu1e_Gm0U80219ggIgaw",
  authDomain: "expofb-e1c34.firebaseapp.com",
  projectId: "expofb-e1c34",
  storageBucket: "expofb-e1c34.appspot.com",
  messagingSenderId: "759799553403",
  appId: "1:759799553403:web:04547574ea83010d4cb1de",
  measurementId: "G-W9ZNW48K8Z",
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export { firebase };
