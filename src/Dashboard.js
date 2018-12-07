import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import firebase from "./firebase";



const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();
this.dbRef = firebase.database().ref(); 



class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      greenBags: 0,
      garbageBags: 0,
      recyclingBags: 0,
      metGoal: false,
      newGoal: "",
      userGoals: ""
    }
  }

  ComponentDidMount() {
    //atach event listener to firebase
    const dbRef = firebase.database().ref(`/${this.props.user.uid}`); 

    dbRef.on('value', (snapshot) => {

      this.setState({
        garbageBags: snapshot.val()
      });
    });
  }

  addBag = (e) => {
    e.preventDefault();
    let userClick = firebase.database().ref(e.target.id)
    let bagValue = Number(e.target.id) + 1
    
    console.log(bagValue);

    this.dbRef.push(bagValue) 
    // console.log(this.state.garbageBags);
  }



  render(){
    return (
      <div className="dashboard">
        {
          this.props.user ? (
            <main>
              <h4>{this.props.user ? `Welcome to your dashboard ${this.props.user.displayName}!` : null} </h4>

              <form className="goalsForm" onSubmit={this.props.handleSubmit}>

                <label htmlFor="">Number of Garbage Bags</label>
                <button
                  id={this.state.garbageBags}
                  data-bag={this.state.garbageBags}
                  name="numberOfBags"
                  type="number"
                  value={this.garbageBags}
                  onClick={this.addBag} >
                  </button>

                <label>
                  Number of compost bags: </label>
                    <button
                    id={this.state.greenBags}
                    data-bag={this.state.greenBags}
                    name="numberOfBags"
                    type="number"
                    value={this.greenBags}
                  onClick={this.addBag} >
                    </button>
               

                <label>Number of recycling bags:</label>
                <button
                  id={this.state.recyclingBags}
                  data-bag={this.state.recyclingBags}
                  name="numberOfBags"
                  type="number"
                  value={this.recyclingBags}
                  onClick={this.addBag} >
                </button>
              </form>


            </main>
          )
            : (
              <h4>You must be logged in to see this page</h4>
            )
        }
      </div>
    )
  }



}

export default Dashboard