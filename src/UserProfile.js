import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Link} from "react-router-dom";
import firebase from "firebase";


class UserProfile extends Component {
   constructor(){
      super()
      this.state = {
         user: null,
         form: {}
      }
   }


   
   	render(){
      return(
         <div>

         </div>
      )
   }
}
export default UserProfile;