import React from 'react';

import './commentBox.scss';

class CommentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      currentText: '',
    };
  }
  handleCommentText = (e) => {
    e.preventDefault();
    this.setState({ currentText: e.target.value });
  };
  render() {
    const { currentText } = this.state;
    return (
      <div className="commnetBoxWrapper">
        <textarea className="textArea" onChange={this.handleCommentText} />
        <button className={currentText.length === 0 ? 'button' : 'button active'} disabled={currentText.length === 0}>
          Post
        </button>
      </div>
    );
  }
}

export default CommentBox;
