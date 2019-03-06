// Import libraries
import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
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
      user: null,
      displayName: null,
      userID: null
    }
  }

  // lifecycle component, pass reference from db to variable user_ref
  // then add event listener on value and callback function to pass firebase value
  // and then set state to global user variable based on firebase value
  componentDidMount() {
      firebase.auth().onAuthStateChanged(firebase_user => {
         if (firebase_user){
             this.setState({
                user : firebase_user,
                displayName: firebase_user.displayName,
                userID : firebase_user.uid
             });

             const meetingsRef = firebase.database().ref('meetings/'+ firebase_user.uid);

             meetingsRef.on('value', snapshot => {
                 let meetings = snapshot.val();
                 let meetingsList = [];

                 for (let item in meetings){
                     meetingsList.push({
                         meetingID : item,
                         meetingName: meetings[item].meetingName
                     })
                 }

                 this.setState({
                     meetings : meetingsList,
                     howManyMeetings : meetingsList.length
                 });

             });
         } else {
             this.setState({user: null});
         }
      });
  }
    registerUser = userName => {
        firebase.auth().onAuthStateChanged(firebase_user => {
            firebase_user.updateProfile({
                displayName: userName
            }).then(() =>{
                this.setState({
                    user: firebase_user,
                    displayName: firebase_user.displayName,
                    userID : firebase_user.uid
                });
                navigate('/meetings');
            })
        })
    };

    // simple logout fn
    logOut = event => {
        event.preventDefault();
        this.setState({
            displayName: null,
            userID : null,
            user: null
        });

        firebase.auth().signOut().then(() =>{
            navigate('/login');
        });
    };

    addMeeting = meetingName => {
      const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
      ref.push({meetingName: meetingName});
    };

    render() {
    return (
        <main>
          <Nav user={this.state.user} logOut={this.logOut}/>
          {this.state.user &&
            <Entry userName={this.state.displayName} logOut={this.logOut} />
          }
          <Router>
              <Homepage path="/" userName={this.state.user} />
              <LoginController path="/login" />
              <MeetingsController
                  path="/meetings"
                  addMeeting={this.addMeeting}
                  meetings={this.state.meetings}
                  userID={this.state.userID} />
              <RegisterController path="/register" registerUser={this.registerUser} />
          </Router>
        </main>
    );
  }
}

export default App;
