// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCixX1Md_GPFpCeZScrdi_Kj4uL64JuYWQ',
  authDomain: 'recipeapp-e9dbe.firebaseapp.com',
  projectId: 'recipeapp-e9dbe',
  storageBucket: 'recipeapp-e9dbe.appspot.com',
  messagingSenderId: '821556810520',
  appId: '1:821556810520:web:935ed3e674a51bf378046d',
  measurementId: 'G-5LR77CCZBK',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
