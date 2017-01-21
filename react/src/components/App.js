import React, { Component } from 'react';
import Beer from './Beer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <div className="row">
        < Beer
        />
      </div>
    )
  }
}

export default App;
