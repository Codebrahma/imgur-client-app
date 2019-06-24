import React from 'react';
import LazyLoad from 'react-lazy-load';
import './card.scss';
import upVote from '../../svgs/upVote';
import downVote from '../../svgs/downVote';
import comment from '../../svgs/comment';
import view from '../../svgs/view';

class Card extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { data } = this.props;
    return (
      <div className="cardWrapper">
        {data && data.images && data.images[0].type === 'video/mp4' ? (
          <LazyLoad>
          <video autoPlay loop className="media" muted>
            <source src={data && data.images && data.images[0].mp4} />
          </video>
          </LazyLoad>
        ) : (
          <LazyLoad>
            <img
              className="media"
              src={
                (data && data.images && data.images[0].link) ||
                (data && data.link)
              }
              alt="img"
            />
          </LazyLoad>
        )}
        <div className="detailsWrapper">
          <div className="title">{data && data.title}</div>
          <div className="countWrapper">
            <div className="StatContainer">
              <div className="IconContainer">{upVote}</div>
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
export default Card;
