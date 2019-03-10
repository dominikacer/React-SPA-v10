// simple component with entry title based of user name

import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import {navigate} from '@reach/router';

class CheckinController extends Component{

    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            email: ''
        };

        this.changeFieldValue = this.changeFieldValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // set new state
    changeFieldValue(event){
        const name = event.target.name;
        const value = event.target.value;

        // refer to constructor to modify original object
        this.setState({[name]: value});
    };


    submitForm(event){
        event.preventDefault();

        const ref = firebase.database().ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);
        ref.push({
            attendeeName : this.state.displayName,
            attendeeEmail : this.state.email,
            starRating : false
        });
        navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
    }

    render(){

        return (
           <div>
               <form className="mt-3" onSubmit={this.submitForm}>
                   <div className="container">
                       <div className="row justify-content-center">
                           <div className="col-lg-6">
                               <div className="card bg-light">
                                   <div className="card-body">
                                       <h3 className="font-weight-light mb-3">Check in</h3>
                                       <section className="form-group">
                                           <label
                                               className="form-control-label sr-only"
                                               htmlFor="displayName"

                                           >
                                               Name
                                           </label>
                                           <input
                                               required
                                               className="form-control"
                                               type="text"
                                               id="displayName"
                                               name="displayName"
                                               placeholder="Name"
                                               value={this.state.displayName}
                                               onChange={this.changeFieldValue}
                                           />
                                       </section>
                                       <section className="form-group">
                                           <label
                                               className="form-control-label sr-only"
                                               htmlFor="Email"
                                           >
                                               Email
                                           </label>
                                           <input
                                               required
                                               className="form-control"
                                               type="email"
                                               id="email"
                                               name="email"
                                               placeholder="Email"
                                               value={this.state.email}
                                               onChange={this.changeFieldValue}
                                           />
                                       </section>
                                       <div className="form-group text-right mb-0">
                                           <button className="btn btn-primary" type="submit">
                                               Check in
                                           </button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </form>
           </div>
        )
    }
}

export default CheckinController;