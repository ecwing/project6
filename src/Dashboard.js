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

    const dbRefpast = firebase.database().ref(`/${this.props.user.uid}/past`);
    dbRefpast.on('value', (snapshot) => {
      if (!snapshot.exists()) {
        dbRefpast.update([{
          greenBags: 0,
          garbageBags: 0,
          blueBags: 0}])
      }
    })

    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);
    dbRef.on('value', (snapshot) => {

      const firebaseState = snapshot.val() || {}

      this.setState({
        garbageBags: firebaseState.garbageBags,
        greenBags: firebaseState.greenBags,
        blueBags: firebaseState.blueBags
      });

      });

    // let firebaseState;
    // dbRef.once('value', (snapshot) => {
    //   firebaseState = snapshot.val();
    //   console.log(firebaseState)

    // }).then(() => {
    //   // this.setState({
    //   //   garbageBags: firebaseState.garbageBags,
    //   //   greenBags: firebaseState.greenBags,
    //   //   blueBags: firebaseState.blueBags
    //   // });

    // })
  }



  addBag = (e) => {
    e.preventDefault();
    //created a database called CURRENT unique to each user
    const dbRef = firebase.database().ref(`/${this.props.user.uid}/current`);

    let userClick = firebase.database().ref(e.target.id)
    let bagValue = Number(e.target.value) + 1
    // sets state
    this.setState({
      [e.target.id]: bagValue
    })
    //updates current Firebase branch
    dbRef.update({
      [e.target.id]: bagValue
    }) 
    
  }

  saveWeek = (e) => {
    e.preventDefault();
    // const deRefpast=  databaseReference.child("Users").child(user.getUid()).setValue(userInformations);

    const dbRefPast = firebase.database().ref(`/${this.props.user.uid}/past`);

    const dbRefCurrent = firebase.database().ref(`/${this.props.user.uid}/current`);


    let pastWeek = {
      greenBags: this.state.greenBags,
      garbageBags: this.state.garbageBags,
      blueBags: this.state.blueBags
    }
    

    // let pastWeek = [{
    //   greenBags: 10,
    //   garbageBags: 10,
    //   blueBags: 10
    // }]

    let newWeek = {
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    }

    this.setState({
      greenBags: 0,
      garbageBags: 0,
      blueBags: 0
    })

    // dbRefpast.push({something: 0, otherthing: 2})

    //try to return the array inside of PAST node of firebase and then .push new object into it and then .update().firebase
    let firebaseArray;
     dbRefPast.once('value', (snapshot) => {
      firebaseArray = snapshot.val();
    }).then(()=>{
      // console.log(pastWeek)
      firebaseArray.push(pastWeek)
      dbRefPast.update(firebaseArray)
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