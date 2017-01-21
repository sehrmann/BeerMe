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
    let beer, beerName, beerDesc, beerLabel, brewer, abv, og, ibu, style, serving;

    if (this.state.numBeers) {
      beer = this.state.beers[this.state.selectedBeerIndex].beer
      beerLabel = (beer.labels ? <img src= { beer.labels.large } /> : <p>No Image Available</p>)
      beerName = <h2> { beer.name } - { beer.breweries[0].name } </h2>;
      beerDesc = <p> { beer.description } </p>;
      abv = (beer.abv ? <li> ABV: { beer.abv } </li> : null)
      og = (beer.originalGravity ? <li> Original Gravity: { beer.originalGravity } </li> : null)
      ibu = (beer.ibu ? <li> IBUs: { beer.ibu } </li> : null)
      style = (beer.style ? <h4> { beer.style.name } </h4> : null)
      if (beer.servingTemperatureDisplay && beer.glass) {
        serving = <h4> Serve { beer.servingTemperatureDisplay } in a { beer.glass.name } </h4>
      } else if (!beer.servingTemperatureDisplay && beer.glass) {
        serving = <h4> Serve in a { beer.glass.name } </h4>
      } else if (beer.servingTemperatureDisplay && !beer.glass) {
        serving = <h4> Serve { beer.servingTemperatureDisplay }</h4>
      } else {
        serving = null
      }
    }
    return(
      <div className="small-12 columns callout primary center">
        <div>
          { beerLabel }
          { beerName }
          { style }
          { serving }
          { beerDesc }
        </div>
        <ul>
          { abv }
          { og }
          { ibu }
        </ul>
        < RandomButton
          handleButtonClick = { this.handleButtonClick }
        />
      </div>
    )
  }
}

export default Beer;
