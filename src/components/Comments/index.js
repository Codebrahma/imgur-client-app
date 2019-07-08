import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { commentData } = this.props;
    return (
      <div>
        {commentData && commentData.map(comment => (
          <Comment key={comment.id} commentProp={comment} />
        ))}
      </div>
    );
  }
}
Comments.propTypes = {
  commentData: PropTypes.instanceOf(Array),
};
Comments.defaultProps = {
  commentData: [],
};

export default Comments;
