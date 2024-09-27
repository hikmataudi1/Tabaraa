import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCbEjHT46Y2YQPE4FIDxKyvcSnEYJUOi1I",
  authDomain: "blood-donation-633ea.firebaseapp.com",
  projectId: "blood-donation-633ea",
  storageBucket: "blood-donation-633ea.appspot.com",
  messagingSenderId: "272370023417",
  appId: "1:272370023417:web:478f8e72518ce85c3e9b28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app)