import React from 'react';
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
        {commentData &&  commentData.map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    );
  }
}
export default Comments;
