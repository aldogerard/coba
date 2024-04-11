import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcgmWRSNGHN4zfpI0GKgkZE1QGOCbX8dc",
  authDomain: "catfishdb-814f7.firebaseapp.com",
  databaseURL:
    "https://catfishdb-814f7-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "catfishdb-814f7",
  storageBucket: "catfishdb-814f7.appspot.com",
  messagingSenderId: "740497823577",
  appId: "1:740497823577:web:99f817b0e1725a4cd0de48",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
