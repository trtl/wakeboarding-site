import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    doc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    setDoc 
  } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyADn0pT53DDyX59qP8Q_MXqQarBOULRIF8",
  authDomain: "wakeb1-web.firebaseapp.com",
  projectId: "wakeb1-web",
  storageBucket: "wakeb1-web.firebasestorage.app",
  messagingSenderId: "443754319127",
  appId: "1:443754319127:web:772f3069c42e79508b3b52"

};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { 
    db, 
    doc, 
    getDoc, 
    updateDoc, 
    arrayUnion, 
    setDoc 
  };