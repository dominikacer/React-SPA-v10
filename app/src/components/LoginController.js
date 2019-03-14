// simple component with entry title based of user name

import React, { Component } from 'react';
import firebase from '../db/DbConnection';
import ErrorController from './ErrorController';
import {navigate} from '@reach/router';

class LoginController extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            error : null
        };

        this.changeFieldValue = this.changeFieldValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    // set new state
    changeFieldValue(event){
        const name = event.target.name;
        const value = event.target.value;

        // refer to constructor to modify original object
        this.setState({[name]: value});
    };


    submitForm(event){
        let registered_user = {
            email : this.state.email,
            password: this.state.password
        };

        event.preventDefault();

        // push new user to db and handle errors
        firebase.auth()
            .signInWithEmailAndPassword(
                registered_user.email,
                registered_user.password
            ).then(() => {
                navigate('/artists');
            })
            .catch(error => {
                if (error.message !== null) {
                    this.setState({error: error.message});
                } else {
                    this.setState({error: null })
                }
            });
    }

    render(){

        return (
            <div>
                <div className="container">
                    <form className="mt-3" onSubmit={this.submitForm}>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-6">
                                    <div className="card bg-light">
                                        <div className="card-body">
                                            <h3 className="font-weight-light mb-3">Log in</h3>
                                            <section className="form-group">
                                                <div className="text-center">
                                                    {this.state.error !== null ? (
                                                        <ErrorController message={this.state.error}/>
                                                    ) : null }
                                                </div>
                                                <label
                                                    className="form-control-label sr-only"
                                                    htmlFor="Email">
                                                    Email
                                                </label>
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={this.state.email}
                                                    onChange={this.changeFieldValue}
                                                />
                                            </section>
                                            <section className="form-group">
                                                <input
                                                    required
                                                    className="form-control"
                                                    type="password"
                                                    name="password"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    onChange={this.changeFieldValue}
                                                />
                                            </section>
                                            <div className="form-group text-right mb-0">
                                                <button className="btn btn-primary" type="submit">
                                                    Log in
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginController;