import React, { Component } from 'react';
import RandomButton from './RandomButton';

class Beer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beers: [],
      numBeers: 0,
      selectedBeerIndex: 4
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    let newSelectedBeerIndex = Math.floor(Math.random() * this.state.numBeers);
    this.setState({
      selectedBeerIndex: newSelectedBeerIndex
    })
  }

  componentDidMount () {
    fetch(`/api/features`)
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status}, (${response.statusText})`;
          let error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        let newBeers = body.data;
        let newNumBeers = newBeers.length;
        let newSelectedBeerIndex = Math.floor(Math.random() * newNumBeers);
        this.setState({
          beers: newBeers,
          numBeers: newNumBeers,
          selectedBeerIndex: newSelectedBeerIndex
        });
      });
  }

  render() {
    let beer, beerName, beerDesc, beerLabel, brewLabel;

    if (this.state.numBeers) {
      beer = this.state.beers[this.state.selectedBeerIndex].beer
      beerLabel = (beer.labels ? <img src= { beer.labels.large } /> : <p>No Image Available</p>)
      brewLabel = (beer.breweries[0].images ? <img src= { beer.breweries[0].images.large } /> : <p>No Image Available</p>)
      beerName = <p> { beer.name } </p>;
      beerDesc = <p> { beer.description } </p>;
    }
    return(
      <div>
        <div>
          { brewLabel }
          { beerLabel }
          { beerName }
          { beerDesc }
        </div>
        < RandomButton
          handleButtonClick = { this.handleButtonClick }
        />
      </div>
    )
  }
}

export default Beer;
