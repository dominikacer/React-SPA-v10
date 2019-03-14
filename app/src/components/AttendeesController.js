import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import {GoTrashcan, GoStar} from 'react-icons/go';
import {FaVolumeUp, FaYoutube, FaSpotify, FaSoundcloud} from 'react-icons/fa';

class SongsLists extends Component {
    constructor(props) {
        super(props);

        this.deleteAttendee = this.deleteAttendee.bind(this);
    };

    deleteAttendee = (event, whichMeeting, whichAttendee) => {
        event.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database().ref(`artists/${adminUser}/${whichMeeting}/attendees/${whichAttendee}`);
        console.log(this.props.meetingID);
        ref.remove();
    };

    toggleStar = (event, starRating, whichMeeting, whichAttendee) => {
        event.preventDefault();
        const adminUser = this.props.adminUser;
        const ref = firebase.database().ref(`artists/${adminUser}/${whichMeeting}/attendees/${whichAttendee}/starRating`);

        if(starRating === undefined) {
            ref.set(true);
        } else {
            ref.set(!starRating);
        }


    };

    render() {
        const admin = this.props.adminUser === this.props.userID ? true : false;
        const attendees = this.props.attendees;
        const mySongs = attendees.map(item => {
            
            const song_link = String(item.songLink);
            console.log(item.songLink);
            const spotify = 'spotify';
            const soundcloud = 'soundcloud';
            const youtube = 'youtube';

            // if( song_link.includes(youtube)){
            //     console.log('jutub');
            // } else if( test.includes(spotify )){
            //     console.log('spotify');
            // } else if( test.includes(soundcloud )){
            //     console.log('soundcloud');
            // } else {
            //     console.log('other')
            // }

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
                                   <a href={item.songLink} target="_blank" className="btn btn-sm btn-outline-secondary">
                                        {song_link.includes(youtube) &&
                                            <FaYoutube />
                                        }
                                        {song_link.includes(spotify) &&
                                            <FaSpotify />
                                        }
                                        {song_link.includes(soundcloud) &&
                                            <FaSoundcloud />
                                        }
                                        {!song_link.includes(youtube) && !song_link.includes(spotify) && !song_link.includes(soundcloud) &&
                                            <FaVolumeUp />
                                        }
                                   </a>
                                   <button className={'btn btn-sm ' + (item.starRating ? 'btn-info' : 'btn-outline-secondary')} onClick={event => this.toggleStar(event, item.starRating, this.props.meetingID, item.attendeeID)}>
                                       <GoStar />
                                   </button>
                               </div>
                           )}
                            <div>{item.songName}</div>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="row justify-content-center">{mySongs}</div>
        );
    }
}

export default SongsLists;
