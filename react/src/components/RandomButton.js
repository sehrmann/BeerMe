import React, { Component } from 'react';

class RandomButton extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return(
      <div className="button" onClick = { this.props.handleButtonClick } >
        Beer Me! <i className="fa fa-beer" aria-hidden="true"></i>
      </div>
    )
  }
}

export default RandomButton;
