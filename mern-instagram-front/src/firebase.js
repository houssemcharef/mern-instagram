import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDuKKmXKSiPAX298GqgBL-vzQQ3cV33v6Q",
  authDomain: "instagram-clone-f067c.firebaseapp.com",
  databaseURL: "https://instagram-clone-f067c.firebaseio.com",
  projectId: "instagram-clone-f067c",
  storageBucket: "instagram-clone-f067c.appspot.com",
  messagingSenderId: "59493601111",
  appId: "1:59493601111:web:b50383c414100ed2397812",
  measurementId: "G-34LBPEJE7V"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
