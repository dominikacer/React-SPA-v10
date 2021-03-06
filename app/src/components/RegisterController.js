// simple component with entry title based of user name

import React, { Component } from 'react';
import ErrorController from './ErrorController';
import firebase from '../db/DbConnection';

class RegisterController extends Component{

    // create constructor for empty objects, which waits for value
    constructor(props){
        super(props);
        this.state = {
            displayName : '',
            email: '',
            passOne: '',
            passTwo: '',
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
        this.setState({[name]: value}, () => {
            if (this.state.passOne !== this.state.passTwo){
                this.setState({error: 'Passwords are not the same'});
            } else {
                this.setState({error: null})
            }
        });
    }

    submitForm(event){
        let registered_user = {
            displayName : this.state.displayName,
            email : this.state.email,
            password: this.state.passOne
        };

        event.preventDefault();

        // push new user to db and handle errors
        firebase.auth()
        .createUserWithEmailAndPassword(
            registered_user.email,
            registered_user.password
        ).then(() => {
            this.props.registerUser(registered_user.displayName);
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
            <form className="mt-3" onSubmit={this.submitForm}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <h3 className="font-weight-light mb-3">Register</h3>
                                    <div className="form-row">
                                        <div className="text-center">
                                            {this.state.error !== null ? (
                                                <ErrorController message={this.state.error}/>
                                            ) : null }
                                        </div>
                                        <section className="col-sm-12 form-group">
                                            <label
                                                className="form-control-label sr-only"
                                                htmlFor="displayName"
                                            >
                                                Display Name
                                            </label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                id="displayName"
                                                placeholder="Display Name"
                                                name="displayName"
                                                required
                                                value={this.state.displayName}
                                                onChange={this.changeFieldValue}
                                            />
                                        </section>
                                    </div>
                                    <section className="form-group">
                                        <label
                                            className="form-control-label sr-only"
                                            htmlFor="email"
                                        >
                                            Email
                                        </label>
                                        <input
                                            className="form-control"
                                            type="email"
                                            id="email"
                                            placeholder="Email Address"
                                            required
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.changeFieldValue}
                                        />
                                    </section>
                                    <div className="form-row">
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                name="passOne"
                                                placeholder="Password"
                                                value={this.state.passOne}
                                                onChange={this.changeFieldValue}
                                            />
                                        </section>
                                        <section className="col-sm-6 form-group">
                                            <input
                                                className="form-control"
                                                type="password"
                                                required
                                                name="passTwo"
                                                placeholder="Repeat Password"
                                                value={this.state.passTwo}
                                                onChange={this.changeFieldValue}
                                            />
                                        </section>
                                    </div>
                                    <div className="form-group text-right mb-0">
                                        <button className="btn btn-primary" type="submit">
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default RegisterController;