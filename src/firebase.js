import firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBZvw10kdECra6-eHH5u_hOQbBNo8MNmNc",
  authDomain: "garbagesorter-hy.firebaseapp.com",
  databaseURL: "https://garbagesorter-hy.firebaseio.com",
  projectId: "garbagesorter-hy",
  storageBucket: "garbagesorter-hy.appspot.com",
  messagingSenderId: "852729370805"
};
firebase.initializeApp(config);


export default firebase