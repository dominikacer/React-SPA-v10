// Homepage Component, just login panel at this moment, in the future dtb & routing

import React from 'react';

import styled from 'styled-components';

const FullViewportHeight = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
`;

const StyledInner = styled.div`
    min-height: 500px;
    border: 4px solid #007bff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 50px;
`;

const HomepageTitle = styled.h1`
    margin: 0 0 20px; 
    font-style: italic;
`;

class Homepage extends React.Component{
    render() {

        const {user} = this.props;

        return(
            <div className="container text-center">
                <div className="row justify-content-center">
                    <FullViewportHeight>
                        <StyledInner  className="col-xs-6">
                            <HomepageTitle className="display-4 text-primary mt-4 mb-2">
                                Tablica Spotkań
                            </HomepageTitle>

                            <div className="link-wrapper mt-4">

                                {user == null && (
                                    <span>
                                        <a href="/register" className="btn btn-outline-primary mr-2">
                                            Zarejestruj się
                                        </a>
                                        <a href="/login" className="btn btn-outline-primary mr-2">
                                            Zaloguj się
                                        </a>
                                    </span>
                                )}
                                {user && (
                                    <a href="/meetings" className="btn btn-primary">
                                        Spotkania
                                    </a>
                                )}
                            </div>
                        </StyledInner>
                    </FullViewportHeight>
                </div>
            </div>
        )
    }
}

export default Homepage;