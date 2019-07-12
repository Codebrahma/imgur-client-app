import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    return (
      <Grid>
        <h1>Posts</h1>
      </Grid>
    );
  }
}

export default Posts;
