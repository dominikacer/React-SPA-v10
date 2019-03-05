// simple navigation based on user variable, if exists or not

import React, { Component } from 'react';
import {FaUsers} from 'react-icons/fa';

class Nav extends Component {
    render(){

        const {user} = this.props;

        return (
            <div className="container-fluid bg-primary">
                <nav className="site-nav navbar navbar-expand navbar-dark higher container">
                    <a href="/" className="navbar-brand">
                        <FaUsers className="mr-1"/>Meeting Log
                    </a>
                    <div className="navbar-nav ml-auto">
                        {user && (
                            <a className="nav-item nav-link" href="/meetings">
                                meetings
                            </a>
                        )}
                        {!user &&(
                            <span>
                                <a className="nav-item nav-link" href="/login">
                                    log in
                                </a>
                                <a className="nav-item nav-link" href="/register">
                                    register
                                </a>
                            </span>
                        )}
                        {user && (
                            <a className="nav-item nav-link" href="/login">
                                log out
                            </a>
                        )}
                    </div>
                </nav>
            </div>
        )
    }
}

export default Nav;