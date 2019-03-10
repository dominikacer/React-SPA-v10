import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import {GoTrashcan, GoStar, GoMail} from 'react-icons/go';

class AttendeesList extends Component {
    constructor(props) {
        super(props);

        this.deleteAttendee = this.deleteAttendee.bind(this);
    };

    deleteAttendee = (event, whichMeeting, whichAttendee) => {
        event.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
        console.log(this.props.meetingID);
        debugger;
        ref.remove();
    };

    toggleStar = (event, starRating, whichMeeting, whichAttendee) => {
        event.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database().ref(`meetings/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/starRating`);

        if(starRating === undefined) {
            ref.set(true);
        } else {
            ref.set(!starRating);
        }


    };

    render() {
        const admin = this.props.adminUser === this.props.userID ? true : false;
        const attendees = this.props.attendees;
        const myAttendees = attendees.map(item => {
            return (
                <div
                    className="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
                    key={item.attendeeID}
                >
                    <div className="card ">
                       <div className={'card-body px-3 py-2 d-flex align-items-center ' + (admin ? '' : 'justify-content-center')}>
                           {admin && (
                               <div className={'btn btn-group pr-2'}>
                                   <button className={'btn btn-sm btn-outline-secondary'} onClick={event => this.deleteAttendee(event, this.props.meetingID, item.attendeeID)}>
                                        <GoTrashcan />
                                   </button>
                                   <a href={`mailto:${item.attendeeEmail}`} className="btn btn-sm btn-outline-secondary">
                                       <GoMail />
                                   </a>
                                   <button className={'btn btn-sm ' + (item.starRating ? 'btn-info' : 'btn-outline-secondary')} onClick={event => this.toggleStar(event, item.starRating, this.props.meetingID, item.attendeeID)}>
                                       <GoStar />
                                   </button>
                               </div>
                           )}
                            <div>{item.attendeeName}</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="row justify-content-center">{myAttendees}</div>
        );
    }
}

export default AttendeesList;
