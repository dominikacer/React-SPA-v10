// simple component with entry title based of user name

import React, { Component } from 'react';

class Entry extends Component{
    render(){

        const { user } = this.props;

        return (
            <div>
                <div className="container">
                    <span className="text-secondary font-weight-bold pl-1 pr-1">
                        Welcome {user},
                    </span>
                    <a href="/" className="text-primary font-weight-bold pl-1 pr-1">
                        log out
                    </a>
                </div>
            </div>
        )
    }
}

export default Entry;