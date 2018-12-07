import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import UserProfile from "./UserProfile";
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
      user:null,
      userGoals: {}
    }
  };

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        }
         ,() => {
           this.dbRef = firebase.database().ref(`/${this.state.user.uid}`) //this creates a refernce specific to the user 
           this.dbRef.on('value', (snapshot) => {
             this.setState({
               userGoals: snapshot.val() || {}
             })
           })
        });
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

  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      console.log(result);
      this.setState({
        user: result.user,
      });
    });
  }

  logOut = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null,
        });
      });
  }

  anonLogIn = () => {
    auth.signInAnonymously()
  }

  render() {
    return (
    <div className="App">
      <header>
        {this.state.user ?
          <button onClick={this.logOut}>Sign Out</button>
          :
          <div>
            <button onClick={this.logIn}>Sign In</button>
            <button onClick={this.anonLogIn}>Sign In as Guest</button>
          </div>}
        <h1>Garbage Sorter</h1>
      </header>

      <Router>
        <div className="routerDaddy">
          <Api />

          <NavLink to="/">Home</NavLink>
          <NavLink to="/userprofile">Go to Your UserPage</NavLink>

          <h6>Above Route</h6>


          <Route path="/userprofile" component={UserProfile} />

          <div className="dashboard">
              {this.state.user ?
              <h4> welcome to your dashboard</h4>
              : 
              <h4> plz sign in</h4>}
          </div>
        </div>
      </Router>
    </div>
    );
  }
}

export default App;
