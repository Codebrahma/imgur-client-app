import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { debounce } from 'throttle-debounce';
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
      loadMoreData: false,
    };
  }
  componentWillMount() {
    this.tempDebounceFuncVariable = debounce(300, this.handleOnScroll);
    window.addEventListener('scroll', this.tempDebounceFuncVariable);
  }

  componentDidMount() {
    this.loadCommentData(this.state.currentPage);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.tempDebounceFuncVariable.cancel(),
    );
  }
  // TODO: add infinite scroll for loading more comments.
  handleOnScroll = () => {
    const { loading, loadMoreData } = this.state;

    // Bail early if:
    // loading: it's already loading
    // !loadMoreData: there's nothing left to load
    if (!loadMoreData || loading) return;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.setState({ loading: true }, () => {
        const nextLoadingPage = this.state.currentPage + 1;
        this.loadCommentData(nextLoadingPage);
      });
    }
  };

  loadCommentData = (currentLoadingPage) => {
    const { username } = this.props.match.params;
    const { sort } = this.state;
    let { commentData } = this.state;
    fetchUserProflieComment(username, sort, currentLoadingPage)
      .then((res) => {
        commentData = [...commentData, ...res.data.data];
        this.setState({
          commentData,
          loading: false,
          loadMoreData: res.data.data.length > 0,
          currentPage: currentLoadingPage,
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { commentData, loading } = this.state;
    return (
      <Grid>
        <div className="userpage__section--comment">
          <Comments commentData={commentData} profileComment />
        </div>
        {loading && (
        <div className="userpage__section--comment-loader">
          <Loader type="Oval" color="#6BD700" height="80" width="80" />
        </div>
          )}
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
