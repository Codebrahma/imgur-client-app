import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import './bottomBar.scss';
import { AuthContext } from '../../context/AuthContext';
import { addToFavorite, galleryVoting } from '../../api';

class BottomBar extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      itemFavouriteState: false,
    };
  }
  componentDidMount() {
    const { votedAlbum } = this.context;
    const { albumId } = this.props;
    this.setState({
      voted: votedAlbum[albumId],
    });
  }

  handleEnter = (e, callback) => {
    if (e.key === 'Enter') {
      callback(e);
    }
  }
  handleVotingAPI = (vote, resetState) => {
    const { albumId: galleryHash } = this.props;
    const { markAlbumAsVoted } = this.context;
    galleryVoting(galleryHash, vote)
      .then((res) => {
        console.log(res);
        if (!res.data.success) {
          // Reset to currentState:
          this.setState(resetState);
        }
        markAlbumAsVoted(galleryHash, vote);
      })
      .catch((err) => {
        // TODO: Send a toast about error and reset.
        console.error(err);
        // Reset to currentState:
        this.setState(resetState);
      });
  }

  handleUpvote = (e) => {
    e.preventDefault();
    const doingReset = this.state.voted === 'up';

    // Setting local state for immediate visual response:
    this.setState({
      voted: doingReset ? null : 'up',
      ups: this.props.data.ups + (doingReset ? 0 : 1),
      downs: this.props.data.downs,
    });

    // Hitting API to persist the changes, passing current state for reset purposes:
    this.handleVotingAPI(doingReset ? 'veto' : 'up', { ...this.state });
  }

  handleDownvote = (e) => {
    e.preventDefault();
    const doingReset = this.state.voted === 'down';

    // Setting local state for immediate visual response:
    this.setState({
      voted: doingReset ? null : 'down',
      downs: this.props.data.downs + (doingReset ? 0 : 1),
      ups: this.props.data.ups,
    });

    // Hitting API to persist the changes, passing current state for reset purposes:
    this.handleVotingAPI(doingReset ? 'veto' : 'down', { ...this.state });
  }

  handleFavourite = (e) => {
    e.preventDefault();
    const { access_token: accessToken } = this.context;
    if (!accessToken) return;
    const { albumId } = this.props;
    addToFavorite(albumId).then((res) => {
      const { data } = res.data;
      if (data === 'favorited') {
        this.setState({ itemFavouriteState: true });
      } else this.setState({ itemFavouriteState: false });
    })
      .catch(err => console.log(err));
  };
  render() {
    console.log(this.state);
    const { itemFavouriteState } = this.state;
    const { votedAlbum } = this.context;
    const { albumId } = this.props;
    const votedUp = votedAlbum[albumId] === 'up';
    return (
      <div className="bottomWrapper">
        <FontAwesomeIcon
          className={votedUp ? `bottomWrapper--${votedAlbum[albumId]}` : ''}
          onClick={this.handleUpvote}
          role="button"
          onKeyDown={e => this.handleEnter(e, this.handleUpvote)}
          tabIndex={0}
          icon="arrow-alt-circle-up"
        />
        <FontAwesomeIcon
          className={!votedUp ? `bottomWrapper--${votedAlbum[albumId]}` : ''}
          onClick={this.handleDownvote}
          role="button"
          onKeyDown={e => this.handleEnter(e, this.handleDownvote)}
          tabIndex={0}
          icon="arrow-alt-circle-down"
        />
        <FontAwesomeIcon
          onClick={this.handleFavourite}
          icon="heart"
          className={itemFavouriteState ? 'favourite' : ''}
        />
      </div>
    );
  }
}
BottomBar.propTypes = {
  albumId: PropTypes.string.isRequired,
  data: PropTypes.shape({
    ups: PropTypes.number,
    downs: PropTypes.number,
    views: PropTypes.number,
  }).isRequired,
};

export default BottomBar;
