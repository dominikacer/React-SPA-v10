import React, {Component} from 'react';

class Homepage extends React.Component{
    render() {
        return(
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-10 col-md-10 col-lg-8 col-xl-7">
                        <div className="display-4 text-secondary mt-4 mb-2">
                            Tablica Spotkań
                        </div>

                        <div className="link-wrapper mt-4">
                            <a href="/register" className="btn btn-outline-primary mr-2">
                                Zarejestruj się
                            </a>
                            <a href="/login" className="btn btn-outline-primary mr-2">
                                Zaloguj się
                            </a>
                            <a href="/meetings" className="btn btn-primary">
                                Spotkania
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;