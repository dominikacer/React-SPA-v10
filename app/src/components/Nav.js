// simple navigation based on user variable, if exists or not

import React, { Component } from 'react';
import {FaUsers} from 'react-icons/fa';
import {Link} from '@reach/router';

class Nav extends Component {
    render(){

        const {user, logOut} = this.props;

        return (
            <div className="container-fluid bg-primary">
                <nav className="site-nav navbar navbar-expand navbar-dark higher container">
                    <Link to="/" className="navbar-brand">
                        <FaUsers className="mr-1"/>Meeting Log
                    </Link>
                    <div className="navbar-nav ml-auto">
                        {user && (
                            <Link className="nav-item nav-link" to="/meetings">
                                meetings
                            </Link>
                        )}
                        {!user &&(
                            <span>
                                <Link className="nav-item nav-link" to="/login">
                                    log in
                                </Link>
                                <Link className="nav-item nav-link" to="/register">
                                    register
                                </Link>
                            </span>
                        )}
                        {user && (
                            <Link className="nav-item nav-link" to="/login" onClick={event => logOut(event)}>
                                log out
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;