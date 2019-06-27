import React from 'react';
import LazyLoad from 'react-lazy-load';
import './comment.scss';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      points: props.comment.points
    };
  }

  render() {
    const { author, comment } = this.props.comment;
    console.log(comment);
    const { points } = this.state;
    console.log(points);
    return (
      <div className="commentWrapper">
        <div className="detailsCommentWrapper">
          <div className="commentHeaderItem">{author}</div>
          <div className="commentHeaderItem">{points} pts</div>
          <div className="commentHeaderItem">...</div>
        </div>
        <div className="commentText">
          {comment.includes('http') ? (
            <LazyLoad>
              <img className="commentImage" src={comment} alt="commentImage" />
            </LazyLoad>
          ) : (
            comment
          )}
        </div>
      </div>
    );
  }
}

export default Comment;
