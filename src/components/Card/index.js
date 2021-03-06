/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { galleryVoting } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import './card.scss';

class Card extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      voted: null,
      // TODO: Check the availability of data.
      ups: this.props.data.ups,
      downs: this.props.data.downs,
      isImageLoading: true,
    };
  }
  componentDidMount() {
    const { votedAlbum } = this.context;
    const { data } = this.props;
    // console.log(votedAlbum[data]);
    this.setState({
      voted: votedAlbum[data.id] || null,
    });
  }

  handleEnter = (e, callback) => {
    if (e.key === 'Enter') {
      callback(e);
    }
  };

  handleVotingAPI = (vote, resetState) => {
    const { id: galleryHash } = this.props.data;
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
  };

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
  };

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
  };
  checkForImageLoading = () => this.setState({ isImageLoading: false });
  getHeight = (height, width) => (height / width) * 250; // here 250 is the card width

  render() {
    const { data, masonry } = this.props;
    const { access_token: accessToken } = this.context;
    const { ups, downs, voted } = this.state;
    return (
      <Link
        className="cardLink"
        to={{
          pathname: `/gallery/${data.id}`,
          state: data,
        }}
        style={{ margin: masonry && '0.5rem' }}
      >
        <div className={`cardWrapper${voted ? ` voted--${voted}` : ''}`} style={{ width: masonry && '250px', height: !masonry && '265px' }}>
          <div
            className="mediaWrapper"
            style={{
              height: masonry && data.images
                ? `${this.getHeight(
                    data.images[0].height,
                    data.images[0].width,
                  )}px`
                : masonry && '250px',
              width: masonry && '250px',
            }}
          >
            <LazyLoad onContentVisible={this.checkForImageLoading}>
              {data && data.images && data.images[0].type === 'video/mp4' ? (
                <video autoPlay loop className="media" muted>
                  <source src={data && data.images && data.images[0].mp4} />
                </video>
              ) : (
                <img
                  className="media"
                  src={
                    (data && data.images && data.images[0].link) ||
                    (data && data.link)
                  }
                  alt="img"
                />
              )}
            </LazyLoad>
            {this.state.isImageLoading && (
              <div className="media" style={{ backgroundColor: 'black' }} />
            )}
          </div>
          <div className="detailsWrapper">
            <div className="title">{data && data.title}</div>
            <div className="countWrapper">
              <div
                className={`statContainer green${
                  voted === 'up' ? ' active' : ''
                }`}
                onClick={this.handleUpvote}
                role="button"
                onKeyDown={e => this.handleEnter(e, this.handleUpvote)}
                tabIndex={0}
              >
                <FontAwesomeIcon icon="arrow-alt-circle-up" />
                <span>{ups}</span>
              </div>
              {accessToken && (
                <div
                  className={`statContainer red${
                    voted === 'down' ? ' active' : ''
                  }`}
                  onClick={this.handleDownvote}
                  role="button"
                  onKeyDown={e => this.handleEnter(e, this.handleDownvote)}
                  tabIndex={0}
                >
                  <FontAwesomeIcon icon="arrow-alt-circle-down" />
                  <span>{downs}</span>
                </div>
              )}
              <div className="statContainer">
                <FontAwesomeIcon icon="comment" />
                <span>{data && data.commentCount}</span>
              </div>
              <div className="statContainer">
                <FontAwesomeIcon icon="eye" />
                <span>{data && data.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    ups: PropTypes.number.isRequired,
    downs: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    images: PropTypes.array,
  }).isRequired,
  masonry: PropTypes.bool.isRequired,
};

export default withRouter(Card);
