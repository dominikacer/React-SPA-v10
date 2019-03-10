// simple component with entry title based of userName name

import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import {GoTrashcan, GoListUnordered} from 'react-icons/go'
import {FaLink} from 'react-icons/fa'
import {navigate} from '@reach/router'

class SingleMeeting extends Component{
    
    constructor(props){
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    deleteItem = (event, whichItem) => {
        event.preventDefault();
        const ref = firebase.database().ref(`meetings/${this.props.userID}/${whichItem}`);
        ref.remove();
    };
    
    render(){

        const { meetings } = this.props;
        const single_meeting = meetings.map(item => {

            return(
                <div className="list-group-item d-flex" key={item.meetingID}>

                    <section className="btn-group align-self-center" role="group">
                        <button className="btn btn-sm btn-outline-secondary" onClick={event => this.deleteItem(event, item.meetingID)}>
                            <GoTrashcan />
                        </button>

                        <button className="btn btn-sm btn-outline-secondary" onClick={ () => navigate(`/checkin/${this.props.userID}/${item.meetingID}`)}>
                            <FaLink />
                        </button>

                        <button className="btn btn-sm btn-outline-secondary" onClick={ () => navigate(`/attendees/${this.props.userID}/${item.meetingID}`)}>
                            <GoListUnordered />
                        </button>
                    </section>

                    <section className="pl-3 text-left align-self-center ">
                        {item.meetingName}
                    </section>
                </div>
            )
        });

        return (
            <div>
                {single_meeting}
            </div>
        )
    }
}

export default SingleMeeting;