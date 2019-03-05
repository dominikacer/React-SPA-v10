// simple component with entry title based of userName name

import React, { Component } from 'react';
import { Link } from '@reach/router';

class Entry extends Component{
    render(){

        const { userName } = this.props;

        return (
            <div>
                <div className="container">
                    <span className="text-secondary font-weight-bold pl-1 pr-1">
                        Welcome {userName},
                    </span>
                    <Link to="/" className="text-primary font-weight-bold pl-1 pr-1">
                        log out
                    </Link>
                </div>
            </div>
        )
    }
}

export default Entry;