import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { fetchUserProflieComment } from '../../api';
import Comments from '../../components/Comments';

class UserComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      sort: 'newest',
      commentData: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.loadCommentData(this.state.currentPage);
  }

  // TODO: add infinite scroll for loading more comments.

  loadCommentData = (currentPage) => {
    const { username } = this.props.match.params;
    const { sort, commentData } = this.state;
    fetchUserProflieComment(username, sort, currentPage)
      .then((res) => {
        const tempCommentData = [...res.data.data, ...commentData];
        this.setState({ commentData: tempCommentData, loading: false });
      }).catch(err => console.log(err));
  }

  render() {
    const { commentData, loading } = this.state;
    return (
      <Grid>
        {loading &&
          <div className="loader">
            <Loader type="Oval" color="#6BD700" height="80" width="80" />
          </div>
           }
        <Comments commentData={commentData} profileComment />
      </Grid>
    );
  }
}
UserComments.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default UserComments;
