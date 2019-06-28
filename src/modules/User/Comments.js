import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <Grid>
        <h1>Comments</h1>
      </Grid>
    );
  }
}

export default Comments;
