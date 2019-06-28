import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <Grid>
        <h1>Favorites</h1>
      </Grid>
    );
  }
}

export default Favorites;
