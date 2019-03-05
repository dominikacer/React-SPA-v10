// simple component with entry title based of user name

import React, { Component } from 'react';
// import firebase from "../db/DbConnection";
// import {navigate} from "@reach/router";

class MeetingsController extends Component{

    constructor(props){
        super(props);
        this.state = {
            meetingName: '',
            error : null
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

        this.props.addMeeting(this.state.meetingName);
        this.setState({meetingName : ''});
    }

    render(){
        return (
            <div>
                <div className="container">
                    <div className="container mt-4">
                        <div className="row justify-content-center">
                            <div className="col-md-8 text-center">
                                <h1 className="font-weight-light">Add a Meeting</h1>
                                <div className="card bg-light">
                                    <div className="card-body text-center">
                                        <form
                                            className="formgroup" onSubmit={this.submitForm}
                                        >
                                            <div className="input-group input-group-lg">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="meetingName"
                                                    placeholder="Meeting name"
                                                    aria-describedby="buttonAdd"
                                                    value={this.state.meetingName}
                                                    onChange={this.changeFieldValue}
                                                />
                                                <div className="input-group-append">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-sm btn-info"
                                                        id="buttonAdd"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MeetingsController;