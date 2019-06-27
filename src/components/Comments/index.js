import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    console.log(this.props.commentData);
    const { commentData } = this.props;
    return (
      <div>
        {commentData &&  commentData.map(comment => (
          <Comment comment={comment} />
        ))}
      </div>
    );
  }
}
export default Comments;
