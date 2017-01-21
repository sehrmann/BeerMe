import React, { Component } from 'react';

class RandomButton extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div onClick = { this.props.handleButtonClick } >
        Randomize!
      </div>
    )
  }
}

export default RandomButton;
