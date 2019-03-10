import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import AttendeesController from './AttendeesController';
import {FaUndo} from 'react-icons/fa';

class Attendees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayAttendees: [],
            searchQuery : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetQuery = this.resetQuery.bind(this);
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
                    attendeeEmail: attendees[item].attendeeEmail,
                    starRating : attendees[item].starRating
                });
            }
            this.setState({
                displayAttendees: attendeesList
            });
        });
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;

        // refer to constructor to modify original object
        this.setState({[name]: value});
    };

    resetQuery(){
        this.setState({
          searchQuery: ''
        })
    };

    render() {

        const dataFilter = item => item.attendeeName.toLowerCase().match(this.state.searchQuery.toLowerCase()) && true;
        const filteredAttendees = this.state.displayAttendees.filter(dataFilter);

        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="font-weight-light text-center">
                            Attendees
                        </h1>
                        <div className="card bg-light mb-4">
                            <div className="card-body text-center">
                                <div className="input-group input-group-lg">
                                    <input type="text" name="searchQuery" value={this.state.searchQuery} placeholder="Search..." className="form-control" onChange={this.handleChange} />
                                    <div className="input-group-append">
                                        <button className="btn btn-sm btn-outline-info" onClick={() => this.resetQuery()}>
                                            <FaUndo/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AttendeesController
                    userID={this.props.userID}
                    meetingID={this.props.meetingID}
                    adminUser={this.props.adminUser}
                    attendees={filteredAttendees}

                />
            </div>
        );
    }
}

export default Attendees;
