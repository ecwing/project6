import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import UserProfile from "./UserProfile";
import Api from "./Search";
import Dashboard from "./Dashboard";
import Responsiveline from "./ResponsiveLine";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
      newGoal: "",
      newPattern: "",
      userGoals: {},
      metGoal: null,
      numberOfBags: 0
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

  handleSubmit = e => {
    e.preventDefault();
    const newUserGoal = {
      date: new Date().toDateString(),
      body: this.state.newGoal,
      body2: this.state.numberOfBags
    };
    this.setState({
      newGoal: ""
    });

    // push data to firebase here
    //Create a unique reference in the Firebase database that is connected to this specific User's ID
    const dbRef = firebase.database().ref(`/${this.state.user.uid}`)
    dbRef.push(newUserGoal);
    
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;    
    this.setState({
      [e.target.id]: e.target.value,
      [name]: value
    });
  };  


  logIn = () => {
    auth.signInWithPopup(provider).then((result) => {
      // console.log(result);
      this.setState(
        {
        user: result.user,
      });
    });
  };

  logOut = () => {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
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
          </div> }
          {this.state.user 
            ? 
            <img className="profilePic" src={this.state.user.photoURL} height="50" alt="Google photo of user"/> 
            : null}    

        <h1>Garbage Sorter</h1>
      </header>

      <Router>
        <div className="routerDaddy">
          <Api />

          <NavLink to="/">Home </NavLink>
          <NavLink to="/userprofile">Go to Your UserPage</NavLink>

          <h6>Above Route</h6>

          <Route path="/userprofile" component={UserProfile} />

          {/* //rendering the dashboard if user is signed in, if not rendering an empty dashboard that prompts user to sign in */}
          {this.state.user ? <Dashboard 
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          /> : <div className="dashboard"> please Sign in to see user dashboard</div>}


        </div>
      </Router>
    </div>
    );
  }
}

export default App;
