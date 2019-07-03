import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './comment.scss';
import CommentBox from '../CommentBox';
import ReportUser from '../Modal/ReportUser';
import { AuthContext } from '../../context/AuthContext';

class Comment extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      points: props.comment.points,
      tempPointForApi: props.comment.points,
      showCommentBox: false,
      replies: props.comment.children,
      showReply: false,
      showOption: false,
      showReportModal: false,
      voted: '',
    };
  }
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutsideOption);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutsideOption);
  }
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };
  handleClickOutsideOption = (event) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ showOption: false });
    }
  };

  handleUpdateReply = (data) => {
    const { replies } = this.state;
    const tempReplies = [data, ...replies];
    this.setState({
      replies: tempReplies,
      showCommentBox: false,
      showReply: true,
    });
  };

  extractLinksAndComments = (comment) => {
    const links = [];
    const strippedComment = comment.replace(
      / ?(https?:\/\/[a-zA-Z\.]+\/[a-zA-Z0-9]+\.[a-z\d]+) ?/g,
      (match) => {
        links.push(match.trim());
        return ' ';
      },
    );
    return { strippedComment, links };
  };
  notify = () => toast('Reported Successfully !');
  handleCloseReportModal = (success) => {
    if (success) {
      this.notify();
    }
    this.setState({ showReportModal: false });
  };
  handleVote = (voteType) => {
    const { voted, points, tempPointForApi } = this.state;
    const { id } = this.props.comment;
    const { access_token } = this.context;
    let voteTypeForApi;
    let tempPoint;
    if (voted === voteType) voteTypeForApi = 'veto';
    else voteTypeForApi = voteType;
    if (voteTypeForApi === 'up' && points === tempPointForApi) {
      tempPoint = points + 1;
      this.setState({ voted: 'up', points: tempPoint });
    } else if (voteTypeForApi === 'down' && points === tempPointForApi) {
      tempPoint = points - 1;
      this.setState({ voted: 'down', points: tempPoint });
    } else if (voteTypeForApi === 'up' && points < tempPointForApi) {
      tempPoint = tempPointForApi + 1;
      this.setState({ voted: 'up', points: tempPoint });
    } else if (voteTypeForApi === 'down' && points > tempPointForApi) {
      tempPoint = tempPointForApi - 1;
      this.setState({ voted: 'down', points: tempPoint });
    } else if (voteTypeForApi === 'veto') {
      tempPoint = tempPointForApi;
      this.setState({ voted: '', points: tempPoint });
    }
    axios({
      url: `https://api.imgur.com/3/comment/${id}/vote/${voteTypeForApi}`,
      method: 'post',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        const { success } = res.data;
        if (!success) {
          this.setState({ points: tempPointForApi, voted: '' });
        }
      })
      .catch(() => this.setState({ points: tempPointForApi, voted: '' }));
  };
  render() {
    const {
      author, comment, image_id, id,
    } = this.props.comment;
    const { replyBox } = this.props;
    const {
      points,
      showCommentBox,
      replies,
      showReply,
      showOption,
      showReportModal,
    } = this.state;
    const { strippedComment, links } = this.extractLinksAndComments(comment);
    return (
      <div className={replyBox ? 'indentCommentBox' : ''}>
        {showReportModal && (
          <ReportUser
            handleCloseReportModal={this.handleCloseReportModal}
            commentId={id}
          />
        )}
        <ToastContainer />
        <div className="commentWrapper">
          <div className="VoteIconWrapper">
            <div className="voteIcon">
              <FontAwesomeIcon
                icon="arrow-alt-circle-up"
                className="ml_05 iconVote"
                focusable
                onClick={() => this.handleVote('up')}
              />
              <FontAwesomeIcon
                icon="arrow-alt-circle-down"
                className="ml_05"
                focusable
                onClick={() => this.handleVote('down')}
              />
            </div>
          </div>
          <div className="detailsCommentWrapper">
            <Link
              className="commentHeaderItem"
              to={`/user/${author}/posts`}
              target="_blank"
            >
              {author}
            </Link>
            <div className="commentHeaderItem">{points} pts</div>
            <div className="commentHeaderItem" ref={this.setWrapperRef}>
              <FontAwesomeIcon
                icon="ellipsis-h"
                className="ml_05 ellipsisIcon"
                focusable
                onClick={() => this.setState({ showOption: !showOption })}
              />
              <div
                className={
                  showOption ? 'floatingOption activeOption' : 'floatingOption'
                }
              >
                <div
                  className="optionItem"
                  onClick={() => this.setState({ showReportModal: true })}
                >
                  Report user
                </div>
              </div>
            </div>
          </div>
          <div className="commentText">
            {strippedComment}
            {links &&
              links.map(link => (
                <LazyLoad key={id}>
                  {link.includes('.mp4') ? (
                    <video autoPlay loop muted>
                      <source src={link} />
                    </video>
                  ) : (
                    <img
                      className="commentImage"
                      src={link}
                      alt="commentImage"
                    />
                  )}
                </LazyLoad>
              ))}
            <FontAwesomeIcon
              icon="reply"
              onClick={() => this.setState({ showCommentBox: !showCommentBox })}
              focusable
              className="mi_05 replyIcon replyIconActive"
            />
          </div>
          {showCommentBox && (
            <CommentBox
              reply
              imageId={image_id}
              commentId={id}
              handleUpdateReply={this.handleUpdateReply}
            />
          )}
        </div>
        {replies && replies.length > 0 && (
          <span
            className="expandReply"
            onClick={() => this.setState({ showReply: !showReply })}
          >
            {showReply ? (
              <FontAwesomeIcon
                icon="minus"
                className="ml_05 expandReplyIcon"
                focusable
              />
            ) : (
              <FontAwesomeIcon
                icon="plus"
                className="ml_05 expandReplyIcon"
                focusable
              />
            )}
            {showReply ? 'collapse' : `${replies.length} reply`}
          </span>
        )}
        <div>
          {showReply &&
            replies.map(reply => (
              <Comment replyBox comment={reply} key={reply.id} />
            ))}
        </div>
      </div>
    );
  }
}
Comment.propTypes = {
  author: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  replyBox: PropTypes.bool,
};
Comment.defaultProps = {
  replyBox: false,
};

export default Comment;
