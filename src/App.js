import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import Api from "./Search";

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

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();


class App extends Component {
  constructor(){
    super();
    this.state = {
      user:null
    }
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
        // , () => {
        //   this.dbRef = firebase.database().ref(`/${this.state.user.uid}`) //this creates a refernce specific to the user 
        //   this.dbRef.on('value', (snapshot) => {
        //     this.setState({
        //       diaryEntries: snapshot.val() || {}
        //     })
        //   })
        // });
      }
    });
  }

  //user login function
  login = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }


  render() {
    return (
      <Router>
        <div className="App">
          <header>

          </header>

          <Api />

        </div>
      </Router>
    );
  }
}

export default App;
