// simple component with entry title based of user name

import React, { Component } from 'react';

class LoginController extends Component{
    render(){

        // const { user } = this.props;

        return (
            <div>
                <div className="container">
                    <h1 className="text-primary text-center">Zaloguj się</h1>
                </div>
            </div>
        )
    }
}

export default LoginController;