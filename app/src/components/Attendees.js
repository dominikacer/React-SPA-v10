import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import AttendeesController from './AttendeesController';

class Attendees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAttendees: []
        };
    }

    componentDidMount() {
        const ref = firebase
            .database()
            .ref(
                `meetings/${this.props.userID}/${
                    this.props.meetingID
                    }/attendees`
            );

        console.log(this.props.userID);
        console.log(this.props.meetingID);

        ref.on('value', snapshot => {
            let attendees = snapshot.val();
            let attendeesList = [];
            for (let item in attendees) {
                attendeesList.push({
                    attendeeID: item,
                    attendeeName: attendees[item].attendeeName,
                    attendeeEmail: attendees[item].attendeeEmail
                });
            }
            this.setState({
                displayAttendees: attendeesList
            });
        });
    }

    render() {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="font-weight-light text-center">
                            Attendees
                        </h1>
                    </div>
                </div>
                <AttendeesController
                    userID={this.props.userID}
                    meetingID={this.props.meetingID}
                    adminUser={this.props.adminUser}
                    attendees={this.state.displayAttendees}
                />
            </div>
        );
    }
}

export default Attendees;
