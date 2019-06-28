/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import LazyLoad from 'react-lazy-load';
import { withRouter } from 'react-router-dom';
import './card.scss';
import upVote from '../../svgs/upVote';
import downVote from '../../svgs/downVote';
import comment from '../../svgs/comment';
import view from '../../svgs/view';
import { AuthContext } from '../../context/AuthContext';

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
              <div className="IconContainer" onClick={()=>alert('clicked')}>{upVote}</div>
              <span>{data && data.ups}</span>
            </div>
            <div className="StatContainer">
              <div className="IconContainer">{downVote}</div>
              <span>{data && data.downs}</span>
            </div>
            <div className="StatContainer">
              <div className="IconContainer">{comment}</div>
              <span>{data && data.commentCount}</span>
            </div>
            <div className="StatContainer">
              <div className="IconContainer">{view}</div>
              <span>{data && data.views}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Card);
