import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './commentBox.scss';
import { createCommentOrReply } from '../../api';
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
  notify = () => toast('Unable to Post Comment!');
  notify1 = () => toast('Your comment has been successfully submitted!!');
  handleApi = (requestType) => {
    const { account_username: accountUsername } = this.context;
    const { currentText: comment } = this.state;
    const { albumId, imageId, commentId } = this.props;
    const image_id = requestType === 'comment' ? albumId : imageId;
    let dataObj = { image_id, comment };
    dataObj = commentId ? { ...dataObj, commentId } : { ...dataObj };
    createCommentOrReply(dataObj)
      .then((res) => {
        if (res.status === 200) {
          const { id } = res.data.data;
          if (requestType === 'comment') {
            const { handleCommentUpdate } = this.props;
            this.setState({ comment:'' }, () => handleCommentUpdate(comment, id));
          } else {
            const { handleUpdateReply, imageId } = this.props;
            const tempObj = {
              id,
              comment,
              author: accountUsername,
              points: 1,
              image_id: imageId,
              children: [],
            };
            handleUpdateReply(tempObj);
          }
          this.notify1();
        } else {
          this.notify();
        }
      })
      .catch(() => this.notify());
  }
  render() {
    const { currentText } = this.state;
    const { access_token } = this.context;
    const { reply } = this.props;
    return (
      <div className="commnetBoxWrapper">
        <ToastContainer />
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
