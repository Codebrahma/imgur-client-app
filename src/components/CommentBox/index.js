import React from 'react';
import axios from 'axios';
import './commentBox.scss';
import { AuthContext } from '../../context/AuthContext';

class CommentBox extends React.Component {
  static contextType = AuthContext;
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
  handleCreateComment = (e) => {
    e.preventDefault();
    const { access_token } = this.context;
    const { currentText } = this.state;
    const { albumId, handleCommentUpdate } = this.props;
    axios({
      method: 'post',
      url: 'https://api.imgur.com/3/comment',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        comment: currentText,
        image_id: albumId,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          handleCommentUpdate(currentText, res.data.data.id);
        } else {
          alert('unable to post comment...');
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { currentText } = this.state;
    const { access_token } = this.context;
    return (
      <div className="commnetBoxWrapper">
        <textarea
          className="textArea"
          onChange={this.handleCommentText}
          disabled={!access_token}
        />
        <button
          className={currentText.length === 0 ? 'button' : 'button active'}
          disabled={currentText.length === 0}
          onClick={this.handleCreateComment}
        >
          Post
        </button>
      </div>
    );
  }
}

export default CommentBox;
