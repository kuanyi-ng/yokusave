import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPMO6zvSCWA5Kz1sdUiVbNmlBO6VrbhsE",
    authDomain: "yokusave.firebaseapp.com",
    databaseURL: "https://yokusave.firebaseio.com",
    projectId: "yokusave",
    storageBucket: "yokusave.appspot.com",
    messagingSenderId: "128375156500",
    appId: "1:128375156500:web:3ddbf293cdef8794301c01",
    measurementId: "G-HVWRKB5QMW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;