import React from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { match, location } from '../../routerPropTypes';
import Media from '../../components/Media';
import BottomBar from '../../components/BottomBar';
import CommentBox from '../../components/CommentBox';
import Comments from '../../components/Comments';
import './album.scss';

class Album extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      albumData: this.props.location.state,
      commentData: null,
    };
  }

  componentDidMount() {
    const promiseArray = [];
    promiseArray.push(this.fetchCommentData());

    if (!this.props.location.state) {
      promiseArray.push(this.fetchAlbumData());
    }
    Promise.all(promiseArray)
      .then((responses) => {
        this.setState(prevState => ({
          commentData: responses[0].data.data,
          albumData: (responses[1] && responses[1].data.data) || prevState.albumData,
        }));
      });
  }

  fetchAlbumData = () => {
    const { galleryHash } = this.props.match.params;
    return axios({
      method: 'get',
      url: `https://api.imgur.com/3/gallery/album/${galleryHash}`,
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    });
  }

  fetchCommentData = () => {
    const { galleryHash } = this.props.match.params;
    return axios({
      method: 'get',
      url: `https://api.imgur.com/3/gallery/${galleryHash}/comments/new`,
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    });
  }

  handlePostedComment = (comment, id) => {
    const { account_username: username } = this.context;
    const { commentData } = this.state;
    const newCommentObj = {
      comment,
      author: username,
      id,
      points: 1,
    };
    const tempCommentDataObj = [newCommentObj, ...commentData];
    this.setState({ commentData: tempCommentDataObj });
  };

  renderAlbumData = () => {
    const { images, id } = this.state.albumData;
    return images ? (
      images.map(image => <Media key={image.bandwidth} content={image} />)
    ) : (
      <Media
        key={id}
        content={this.state.albumData}
      />
    );
  }

  render() {
    const { albumData, commentData } = this.state;
    const { galleryHash } = this.props.match.params;

    return (
      <div className="albumWrapper">
        { albumData ? (
          <this.renderAlbumData />
        ) : (
          <h1>Loading Album Data</h1>
        )}

        <BottomBar />

        <CommentBox
          albumId={galleryHash}
          handleCommentUpdate={this.handlePostedComment}
        />

        { commentData ? (
          <Comments commentData={commentData} />
        ) : (
          <h1>Loading Comment Data</h1>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: match.isRequired,
  location: location.isRequired,
};

export default Album;
