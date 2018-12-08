import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import './App.css';
import firebase from "./firebase";
import Responsivepie from "./ResponsivePie";


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: this.props.user,
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    }
  }

  componentDidMount() {
    //on mount, take a snapshot of firebase CURRENT node, and use that to set State of component. So everything is up to date.
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);
    dbRef.on('value', (snapshot) => {

      const firebaseState = snapshot.val()
      console.log(firebaseState);
      console.log(firebase.sta)

      this.setState({
        garbageBags: firebaseState.garbageBags,
        greenBags: firebaseState.greenBags,
        blueBags: firebaseState.blueBags
      });

      });

  }



  addBag = (e) => {
    e.preventDefault();
    //created a database called CURRENT unique to each user
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);

    let userClick = firebase.database().ref(e.target.id)
    let bagValue = Number(e.target.value) + 1

    //sets state depending on which button user clicks
    this.setState({
      [e.target.id]: bagValue
    })
    //updates current Firebase branch
    dbRef.update({
      [e.target.id]: bagValue
    }) 
  }

  //function that passes users CURRENT totals into a node titled PAST to be used later.
  saveWeek = (e) => {
    e.preventDefault();
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/past`);
    const dbRefCurrent = firebase.database().ref(`/${this.props.user.uid}/current`);

    //creating an object of users CURRENT weekly totals
    let pastWeek = {
      greenBags: this.state.greenBags,
      garbageBags: this.state.garbageBags,
      blueBags: this.state.blueBags
    }
    //creating an object to RESET users weekly totals on submit
    let newWeek = {
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    }
    //resetting local state
    this.setState({
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    })
    //returning the array inside of PAST node of firebase
    let firebaseArray;
     dbRef.once('value', (snapshot) => {
      firebaseArray = snapshot.val();
    }).then(()=>{
      //adding pastWeek object to the firebaseArray that includes all past weeks in order from oldest to newest
      firebaseArray.push(pastWeek)
      //pushing users weekly totals(and past totals) to /past node in firebase
      dbRef.update(firebaseArray)
      //pushing a RESET object to users /current node in firebase
      dbRefCurrent.update(newWeek)
    })
  }



  render(){
    return (
      <div className="dashboard">
        {
          this.props.user ? (
            <main>
              <h4>{this.props.user ? `Welcome to your dashboard ${this.props.user.displayName}!` : null} </h4>

              <form className="goalsForm" onSubmit={this.saveWeek}>

                <label htmlFor="">Number of Garbage Bags</label>
                <button
                  id="garbageBags"
                  data-bag={this.state.garbageBags}
                  type="number"
                  value={this.state.garbageBags}
                  onClick={this.addBag} >
                  GARBAGE {this.state.garbageBags}</button>

                <label>Number of compost bags: </label>
                    <button
                    id="greenBags"
                    data-bag={this.state.greenBags}
                    type="number"
                    value={this.state.greenBags}
                  onClick={this.addBag} >
                  GREENBIN {this.state.greenBags}</button>
               

                <label>Number of recycling bags:</label>
                <button
                  id="blueBags"
                  data-bag={this.state.blueBags}
                  type="number"
                  value={this.state.blueBags}
                  onClick={this.addBag} >
                  BLUE BIN {this.state.blueBags}</button>

                  <input type="submit"/>
              </form>
              <div className="weeklyPie">
                <Responsivepie garbageBags={this.state.garbageBags}
                  greenBags={this.state.greenBags}
                  blueBags={this.state.blueBags}/>
              </div>


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