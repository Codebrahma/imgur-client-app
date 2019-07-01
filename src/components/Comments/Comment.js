import React from 'react';
import LazyLoad from 'react-lazy-load';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './comment.scss';
import CommentBox from '../CommentBox';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);

    this.state = {
      points: props.comment.points,
      showCommentBox: false,
      replies: props.comment.children,
      showReply: false,
    };
  }
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

  render() {
    const {
      author, comment, image_id, id,
    } = this.props.comment;
    const { replyBox } = this.props;
    const {
      points, showCommentBox, replies, showReply,
    } = this.state;
    const { strippedComment, links } = this.extractLinksAndComments(comment);
    return (
      <div className={replyBox && 'indentCommentBox'}>
        <div className="commentWrapper">
          <div className="detailsCommentWrapper">
            <Link className="commentHeaderItem" to={`/user/${author}/posts` } target="_blank">{author}</Link>
            <div className="commentHeaderItem">{points} pts</div>
            <div className="commentHeaderItem">
              <FontAwesomeIcon icon="ellipsis-h" className="ml_05" focusable />
            </div>
          </div>
          <div className="commentText">
            {strippedComment}
            {links &&
              links.map(link => (
                <LazyLoad key={id}>
                  {link.includes('.mp4') ? (
                    <video autoPlay loop muted>
                      {/* <track src={link} kind="caption" srcLang="en" label="english_caption" /> */}
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
              className="ml_05"
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
            {
              showReply ?
                <FontAwesomeIcon icon="minus" className="ml_05 expandReplyIcon" focusable />
              :
                <FontAwesomeIcon icon="plus" className="ml_05 expandReplyIcon" focusable />
            }
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

export default Comment;
