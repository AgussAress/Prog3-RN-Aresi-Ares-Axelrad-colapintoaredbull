import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAptirtAEQIkKxPO0Kclwl5Xe3LXCALjlc",
  authDomain: "proyecto-integrador-87035.firebaseapp.com",
  projectId: "proyecto-integrador-87035",
  storageBucket: "proyecto-integrador-87035.appspot.com",
  messagingSenderId: "933612203110",
  appId: "1:933612203110:web:7dc742aa4b60e0c61911a7",
};

if (!app.apps.length) {
  app.initializeApp(firebaseConfig);
}

export const auth = app.auth();
export const db = app.firestore();
export const storage = app.storage();
