/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import './comment.scss';
import CommentBox from '../CommentBox';
import ReportUser from '../Modal/ReportUser';
import { voteForCommentAndReply } from '../../api';
import { AuthContext } from '../../context/AuthContext';

class Comment extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    const { points, children } = props.commentProp;
    this.state = {
      points,
      showCommentBox: false,
      replies: children,
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
  // Toast messages
  notify = () => toast('Reported Successfully !');
  notifyBadRequest = () => toast('Something went wrong!');
  notifyUserNotLoggedIn = () => toast('Please login first !');

  handleCloseReportModal = (success) => {
    if (success) {
      this.notify();
    }
    this.setState({ showReportModal: false });
  };
  handleVote = (voteType) => {
    const { voted, points } = this.state;
    const { points: tempPointForApi } = this.props.commentProp;
    const { id } = this.props.commentProp;
    const { access_token: accessToken } = this.context;
    if (!accessToken) {
      this.notifyUserNotLoggedIn();
      return;
    }
    let extraPoint = 0;
    const voteTypeForApi = voted === voteType ? 'veto' : voteType;
    extraPoint = extraPoint === 0 && voteTypeForApi === 'up' ? 1 : extraPoint;
    extraPoint = extraPoint === 0 && voteTypeForApi === 'down' ? -1 : extraPoint;
    const tempPoint = tempPointForApi + extraPoint;
    this.setState({ voted: voteTypeForApi, points: tempPoint });
    voteForCommentAndReply(id, voteTypeForApi)
      .then((res) => {
        const { success } = res.data;
        if (!success) {
          this.notifyBadRequest();
          this.setState({ points, voted });
        }
      })
      .catch(() => {
        this.notifyBadRequest();
        this.setState({ points, voted });
      });
  };
  render() {
    const { commentProp, profileComment } = this.props;
    const {
      author,
      comment,
      image_id: imageId,
      id,
      album_cover: albumCover,
    } = commentProp;
    const { replyBox } = this.props;
    const {
      points,
      showCommentBox,
      replies,
      showReply,
      showOption,
      showReportModal,
      voted,
    } = this.state;
    const { strippedComment, links } = this.extractLinksAndComments(comment);
    return (
      <div
        className={replyBox ? 'indentCommentBox' : ''}
      >
        {showReportModal && (
          <ReportUser
            handleCloseReportModal={this.handleCloseReportModal}
            commentId={id}
          />
        )}
        <ToastContainer />
        <div className={`commentWrapper ${voted === 'up' ?
          'activeVoteUp' : ''} ${voted === 'down' ? 'activeVoteDown' : ''}`}
        >
          {profileComment && (
            <LazyLoad className="fixToLeft padding">
              <Link to={`/gallery/${imageId}`}>
                {' '}
                <img
                  className="resizeImage"
                  src={`https://i.imgur.com/${albumCover}.png`}
                  alt="img"
                />
              </Link>
            </LazyLoad>
          )}
          {!profileComment && (
            <div className=" fixToLeft voteIconWrapper">
              <div className="voteIcon">
                <FontAwesomeIcon
                  icon="arrow-alt-circle-up"
                  className={`ml_05 iconVote${(voted === 'up' && ' activeUp') ||
                    ''}`}
                  focusable
                  onClick={() => this.handleVote('up')}
                />
                <FontAwesomeIcon
                  icon="arrow-alt-circle-down"
                  className={`ml_05 ${(voted === 'down' && ' activeDown') ||
                    ''}`}
                  focusable
                  onClick={() => this.handleVote('down')}
                />
              </div>
            </div>
          )}
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
                    <video  className="commentMedia" autoPlay loop muted>
                      <source src={link} />
                    </video>
                  ) : (
                    <img
                      className="commentMedia"
                      src={link}
                      alt="commentImage"
                    />
                  )}
                </LazyLoad>
              ))}
            {!profileComment && (
              <FontAwesomeIcon
                icon="reply"
                onClick={() =>
                  this.setState({ showCommentBox: !showCommentBox })
                }
                focusable
                className="mi_05 replyIcon replyIconActive"
              />
            )}
          </div>
          {showCommentBox && (
            <CommentBox
              reply
              imageId={imageId}
              commentId={id}
              handleUpdateReply={this.handleUpdateReply}
            />
          )}
        </div>
        {!profileComment && replies && replies.length > 0 && (
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
              <Comment replyBox commentProp={reply} key={reply.id} />
            ))}
        </div>
      </div>
    );
  }
}
Comment.propTypes = {
  commentProp: PropTypes.shape({
    author: PropTypes.string,
    comment: PropTypes.string,
    image_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  replyBox: PropTypes.bool,
  profileComment: PropTypes.bool,
};
Comment.defaultProps = {
  replyBox: false,
  profileComment: false,
};

export default Comment;
