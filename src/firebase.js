import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyC2aSQeU7Hgx2EEqcgdetZfBdemmHaBy98",
    authDomain: "robinhood-68dd6.firebaseapp.com",
    projectId: "robinhood-68dd6",
    storageBucket: "robinhood-68dd6.appspot.com",
    messagingSenderId: "476494772432",
    appId: "1:476494772432:web:eb2da6f49e1768c59806d5"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  
  export { db };
