import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAptirtAEQIkKxPO0Kclwl5Xe3LXCALjlc",
    authDomain: "proyecto-integrador-87035.firebaseapp.com",
    projectId: "proyecto-integrador-87035",
    storageBucket: "proyecto-integrador-87035.firebasestorage.app",
    messagingSenderId: "933612203110",
    appId: "1:933612203110:web:7dc742aa4b60e0c61911a7"
};

app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const db = app.database()
export const storage = app.storage()