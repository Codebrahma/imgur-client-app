import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
  handleApi = (requestType) => {
    const { access_token, account_username } = this.context;
    const { currentText } = this.state;
    let url;
    let image_id;
    if (requestType === 'comment') {
      const { albumId } = this.props;
      url = 'https://api.imgur.com/3/comment';
      image_id = albumId;
    } else {
      const { imageId, commentId } = this.props;
      url = `https://api.imgur.com/3/comment/${commentId}`;
      image_id = imageId;
    }
    axios({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: {
        comment: currentText,
        image_id,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          const { id } = res.data.data;
          if (requestType === 'comment') {
            const { handleCommentUpdate } = this.props;
            this.setState({ currentText: '' }, () => handleCommentUpdate(currentText, id));
          } else {
            const { handleUpdateReply, imageId } = this.props;
            const tempObj = {
              id,
              comment: currentText,
              author: account_username,
              points: 1,
              image_id: imageId,
              children: [],
            };
            handleUpdateReply(tempObj);
          }
        } else {
          alert('unable to post comment...');
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    const { currentText } = this.state;
    const { access_token } = this.context;
    const { reply } = this.props;
    return (
      <div className="commnetBoxWrapper">
        <textarea
          className="textArea"
          value={currentText}
          onChange={this.handleCommentText}
          disabled={!access_token}
        />
        <button
          className={`button${(currentText.length !== 0 && ' active') || ''}`}
          disabled={currentText.length === 0}
          onClick={reply ? () => this.handleApi('reply') : () => this.handleApi('comment')}
        >
          Post
        </button>
      </div>
    );
  }
}
CommentBox.propTypes = {
  reply: PropTypes.bool,
  albumId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  commentId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  imageId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  handleCommentUpdate: PropTypes.func,
  handleUpdateReply: PropTypes.func,
};
CommentBox.defaultProps = {
  reply: false,
  albumId: null,
  commentId: null,
  imageId: null,
  handleUpdateReply: null,
  handleCommentUpdate: null,
};
export default CommentBox;
