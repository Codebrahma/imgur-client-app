import React from 'react';
import LazyLoad from 'react-lazy-load';
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
      showReply: false
    };
  }
  handleUpdateReply = data => {
    let { replies } = this.state;
    let tempReplies = [data,...replies];
    console.log(tempReplies);
    this.setState({replies:tempReplies,showCommentBox:false,showReply:true});
  };

  extractLinksAndComments = comment => {
    const links = [];
    const strippedComment = comment.replace(
      / ?(https?:\/\/[a-zA-Z\.]+\/[a-zA-Z0-9]+\.[a-z\d]+) ?/g,
      match => {
        links.push(match.trim());
        return ' ';
      }
    );
    return { strippedComment, links };
  };

  render() {
    const { author, comment, image_id, id } = this.props.comment;
    const { points, showCommentBox, replies, showReply } = this.state;
    const { strippedComment, links } = this.extractLinksAndComments(comment);
    console.log(this.props.comment);
    console.log(showReply);
    return (
      <div>
        <div className="commentWrapper">
          <div className="detailsCommentWrapper">
            <div className="commentHeaderItem">{author}</div>
            <div className="commentHeaderItem">{points} pts</div>
            <div className="commentHeaderItem">...</div>
          </div>
          <div className="commentText">
            {strippedComment}
            {links &&
              links.map(link => (
                <LazyLoad>
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
            <div onClick={() => this.setState({ showCommentBox: true })}>
              Reply
            </div>
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
          <span onClick={() => this.setState({ showReply: !showReply })}>
            + {replies.length}
          </span>
        )}
        <div>
          {showReply &&
            replies.map(reply => <Comment comment={reply} key={reply.id} />)}
        </div>
      </div>
    );
  }
}

export default Comment;