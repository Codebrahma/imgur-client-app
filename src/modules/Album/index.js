import React from 'react';
import axios from 'axios';
import Media from '../../components/Media';
import BottomBar from '../../components/BottomBar';
import CommentBox from '../../components/CommentBox';
import './album.scss';
import { AuthContext } from '../../context/AuthContext';
import Comments from '../../components/Comments';

class Album extends React.Component {
  static contextType = AuthContext;
  constructor() {
    super();
    this.state = {
      postedComment: null,
      commentData: null,
    };
  }
  componentDidMount() {
    const { id } = this.props.location.state;
    axios({
      method: 'get',
      url: `https://api.imgur.com/3/gallery/${id}/comments/new`,
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    })
      .then((res) => {
        this.setState({ commentData: res.data.data });
      })
      .catch(err => console.log(err));
  }
  handlePostedComment = (comment, CommentId) => {
    const { commentData } = this.state;
    const {  id } = this.props.location.state;
    const { account_username } = this.context;
    const newCommentObj = {
      comment,
      author: account_username,
      id: CommentId,
      points: 1,
      image_id: id,
      children: [],
    };
    const tempCommentDataObj = [newCommentObj, ...commentData];
    this.setState({ commentData: tempCommentDataObj });
  };

  render() {
    const { images, id } = this.props.location.state;
    const { commentData } = this.state;
    return (
      <div className="albumWrapper">
        {images ? (
          images.map(image => <Media key={image.bandwidth} content={image} />)
        ) : (
          <Media
            key={this.props.location.state.id}
            content={this.props.location.state}
          />
        )}
        <BottomBar albumId={id} />
        <CommentBox
          albumId={id}
          handleCommentUpdate={this.handlePostedComment}
        />
        <Comments commentData={commentData} />
      </div>
    );
  }
}
export default Album;
