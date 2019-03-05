// Import libraries
import React, { Component } from 'react';
import {Router} from '@reach/router';
import firebase from './db/DbConnection';
// Import styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// Import own components
import Nav from './components/Nav';
import Entry from './components/Entry';
import LoginController from './components/LoginController';
import RegisterController from './components/RegisterController';
import MeetingsController from './components/MeetingsController';
import Homepage from './components/Homepage';
// Db connection

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  // lifecycle component, pass reference from db to variable user_ref
  // then add event listener on value and callback function to pass firebase value
  // and then set state to global user variable based on firebase value
  componentDidMount() {
      const user_ref = firebase.database().ref('user');

      user_ref.on('value', snapshot => {
          let firebase_user = snapshot.val();
          this.setState({user:firebase_user});
      })
  }

    render() {
    return (
        <main>
          <Nav user={this.state.user} />
          {this.state.user &&
            <Entry  user={this.state.user}/>
          }
          <Router>
              <Homepage path="/" user={this.state.user} />
              <LoginController path="/login" />
              <MeetingsController path="/meetings" />
              <RegisterController path="/register" />
          </Router>
        </main>
    );
  }
}

export default App;
