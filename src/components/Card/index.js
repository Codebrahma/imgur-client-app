/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { withRouter } from 'react-router-dom';
import LazyLoad from 'react-lazy-load';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { AuthContext } from '../../context/AuthContext';
import { history } from '../../routerPropTypes';
import './card.scss';

class Card extends React.Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {};
  }
  handleCardClick = (data) => {
    this.props.history.push(`/gallery/${data.id}`, { ...data });
  };
  render() {
    const { data } = this.props;
    const { access_token } = this.context;
    return (
      <div className="cardWrapper">
        <LazyLoad >
          {data && data.images && data.images[0].type === 'video/mp4' ? (
            <video
              autoPlay
              loop
              className="media"
              muted
              onClick={() => this.handleCardClick(data)}
            >
              <source src={data && data.images && data.images[0].mp4} />
            </video>
          ) : (
            <img
              className="media"
              onClick={() => this.handleCardClick(data)}
              src={
                (data && data.images && data.images[0].link) ||
                (data && data.link)
              }
              alt="img"
            />
          )}
        </LazyLoad>
        <div className="detailsWrapper">
          <div className="title">{data && data.title}</div>
          <div className="countWrapper">
            <div className="StatContainer">
              {/* <div className="IconContainer" onClick={()=>alert('clicked')}>{upVote}</div> */}
              <FontAwesomeIcon icon="arrow-alt-circle-up" />
              <span>{data && data.ups}</span>
            </div>
            <div className="StatContainer">
              <FontAwesomeIcon icon="arrow-alt-circle-down" />
              <span>{data && data.downs}</span>
            </div>
            <div className="StatContainer">
              <FontAwesomeIcon icon="comment" />
              <span>{data && data.commentCount}</span>
            </div>
            <div className="StatContainer">
              <FontAwesomeIcon icon="eye" />
              <span>{data && data.views}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  history: history.isRequired,
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
};

export default withRouter(Card);
