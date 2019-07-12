import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { commentData, profileComment } = this.props;
    console.log(commentData);
    return (
      <div>
        {commentData &&
          commentData.map(comment => (
            <Comment
              key={comment.datetime + comment.id}
              commentProp={comment}
              profileComment={profileComment}
            />
          ))}
      </div>
    );
  }
}
Comments.propTypes = {
  commentData: PropTypes.instanceOf(Array),
  profileComment: PropTypes.bool,
};
Comments.defaultProps = {
  commentData: [],
  profileComment: false,
};

export default Comments;
