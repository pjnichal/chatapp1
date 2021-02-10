import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBb2g9NPk5W0F33zjQPQ0dwJgksbJZqigI",
  authDomain: "chatapp-4ad37.firebaseapp.com",
  projectId: "chatapp-4ad37",
  storageBucket: "chatapp-4ad37.appspot.com",
  messagingSenderId: "735523937870",
  appId: "1:735523937870:web:c5bfbc40e0ec001bcced1f",
};
const app = firebase.initializeApp(firebaseConfig);
const database = app.firestore();

export default database;
