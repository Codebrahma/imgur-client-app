import React from 'react';
import LazyLoad from 'react-lazy-load';
import './comment.scss';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      points: props.comment.points,
    };
  }
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
    const { author, comment } = this.props.comment;
    const { points } = this.state;
    const { strippedComment, links } = this.extractLinksAndComments(comment);
    return (
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
                  <img className="commentImage" src={link} alt="commentImage" />
                )}
              </LazyLoad>
            ))}
        </div>
      </div>
    );
  }
}

export default Comment;
