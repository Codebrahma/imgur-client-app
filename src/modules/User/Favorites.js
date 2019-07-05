import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';
import CardRenderer from '../CardRenderer';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    const { username } = this.props.match.params;
    return (
      <Grid>
        <h1>Favorites</h1>
        <CardRenderer type="favorites" userName={username} />
      </Grid>
    );
  }
}
Favorites.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Favorites;
