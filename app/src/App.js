// Import libraries
import React, { Component } from 'react';
// Import styles
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

// Import own components
import Entry from './components/Entry';
import Homepage from './components/Homepage';

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: 'Doom'
    }
  }

  render() {
    return (
        <main>
          {this.state.user &&
            <Entry  user={this.state.user}/>
          }
          <Homepage  user={this.state.user}/>
        </main>
    );
  }
}

export default App;