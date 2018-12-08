import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link } from "react-router-dom";
import './App.css';
import firebase from "./firebase";
import Responsivepie from "./ResponsivePie";


const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();



class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      greenBags: 0,
      garbageBags: 10,
      blueBags: 0
    }
  }
  

  ComponentDidMount() {
    //atach event listener to firebase
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);

    this.dbRef.on('value', (snapshot) => {
      this.setState({
        garbageBags: snapshot.val(),
        greenBags: snapshot.val(),
        blueBags: snapshot.val()
      });
    });
  }



  addBag = (e) => {
    e.preventDefault();
    //created a database called CURRENT unique to each user
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);

    let userClick = firebase.database().ref(e.target.id)
    let bagValue = Number(e.target.value) + 1
    
    //sets state
    this.setState({
      [e.target.id]: bagValue
    })

    //updates current Firebase branch
    dbRef.update({
      [e.target.id]: bagValue
    }) 
    // console.log(this.state.garbageBags);
  }

  saveWeek = (e) => {
    e.preventDefault();

    const dbRef = firebase.database().ref(`/${this.props.user.uid}/past`);

    let pastWeek = {
      greenBags: this.state.greenBags,
      garbageBags: this.state.garbageBags,
      blueBags: this.state.blueBags
    }

    console.log(pastWeek)

    this.setState({
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    })

    //try to return the array inside of PAST node of firebase and then .push new object into it and then .update().firebase
    let firebaseArray;
     dbRef.once('value', (snapshot) => {
      firebaseArray = snapshot.val();
    }).then(()=>{
      console.log(firebaseArray)
      firebaseArray.push(pastWeek)
      console.log(firebaseArray)
      dbRef.update(firebaseArray)
    })

    // console.log(firebaseArray)

    //.push pastWeek into firebaseArray and then update firebase

    
    // dbRef.update(newFireBaseArray;
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
                <Responsivepie state={this.state}/>
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