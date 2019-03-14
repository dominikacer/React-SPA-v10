// simple navigation based on user variable, if exists or not

import React, { Component } from 'react';
import {IoIosRadio} from 'react-icons/io';
import {Link} from '@reach/router';

class Nav extends Component {
    render(){

        const {user, logOut} = this.props;

        return (
            <div className="container bg-primary">
                <nav className="site-nav navbar navbar-expand navbar-dark higher container">
                    <Link to="/" className="navbar-brand">
                        <IoIosRadio className="mr-3"/>Dashboard
                    </Link>
                    <div className="navbar-nav ml-auto">
                        {user && (
                            <Link className="nav-item nav-link" to="/artists">
                                artists
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