import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link, NavLink} from "react-router-dom";
import firebase from "firebase";
import "./App.css";
import UserProfile from "./UserProfile";
import Api from "./Search";
import Dashboard from "./Dashboard";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class App extends Component {
  constructor(){
    super();
    this.state = {
      user:null,
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

          <Dashboard 
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          /> 
          {/* <div className="dashboard">
            {
              this.state.user ? (
              <main>
                <h4>{this.state.user ? `Welcome to your dashboard ${this.state.user.displayName}!` : null } </h4>

                <form ClassName="goalsForm" onSubmit={this.handleSubmit}>
                  
                  <label htmlFor="">Personal Goal for the week: </label>
                  <input
                    type="text"
                    value={this.state.newGoal}
                    id="newGoal"
                    onChange={this.handleChange}
                  />

                  <label>
                    Goal Met:
                    <input
                      name="metGoal"
                      type="checkbox"
                      checked={this.state.metGoal}
                      onChange={this.handleChange} />
                  </label>

                  <label>
                    Number of bags:
                    <input
                      name="numberOfBags"
                      type="number"
                      value={this.state.numberOfBags}
                      onChange={this.handleChange} />
                  </label>                  

                  <label>Number of Coffee cups thrown Out:</label>
                    <input
                      name="numberOfCups"
                      type="number"
                      value={this.state.numberOfCups}
                      onChange={this.handleChange} />
                  <input 
                    type="submit" />
                </form>


                <section className="entries">
                  {Object.entries(this.state.userGoals).map(goal => {
                    return (
                      <article key={goal[0]}>
                        <p>Written on: {goal[1].date}</p>
                        <p>{goal[1].body}</p>
                        <p>{goal[1].body2}</p>
                      </article>
                    );
                  })}
                </section>
              </main>
              )
              : (
              <h4>You must be logged in to see this page</h4>
              )
            }
          </div> */}


        </div>
      </Router>
    </div>
    );
  }
}

export default App;
