// Import libraries
import React, { Component } from 'react';
import {Router, navigate} from '@reach/router';
// Db connection
import firebase from './db/DbConnection';
// Import styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
// Import own components
import Nav from './components/Nav';
import Entry from './components/Entry';
import LoginController from './components/LoginController';
import RegisterController from './components/RegisterController';
import ArtistsController from './components/ArtistsController';
import Homepage from './components/Homepage';
import AddSongController from './components/AddSongController';
import Songs from './components/Songs';

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

             const artistsRef = firebase.database().ref('artists/'+ firebase_user.uid);

             artistsRef.on('value', snapshot => {
                 let artists = snapshot.val();
                 let artistsList = [];

                 for (let item in artists){
                     artistsList.push({
                         meetingID : item,
                         artistName: artists[item].artistName
                     })
                 }

                 this.setState({
                     artists : artistsList,
                     howManyartists : artistsList.length
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
                navigate('/artists');
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

    addArtist = artistName => {
      const ref = firebase.database().ref(`artists/${this.state.user.uid}`);
      ref.push({artistName: artistName});
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
              <ArtistsController
                  path="/artists"
                  addArtist={this.addArtist}
                  artists={this.state.artists}
                  userID={this.state.userID} />
              <Songs
                  path="/attendees/:userID/:meetingID"
                  adminUser={this.state.userID} />
              <AddSongController path="/checkin/:userID/:meetingID" />
              <RegisterController path="/register" registerUser={this.registerUser} />
          </Router>
        </main>
    );
  }
}

export default App;
