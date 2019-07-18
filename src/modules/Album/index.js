import React from 'react';
import { AuthContext } from '../../context/AuthContext';
import { match, location } from '../../routerPropTypes';
import { fetchAlbumData, fetchCommentData } from '../../api';
import Media from '../../components/Media';
import BottomBar from '../../components/BottomBar';
import CommentBox from '../../components/CommentBox';
import Comments from '../../components/Comments';
import Loader from '../../components/Loader';
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
        }), () => { document.title = this.state.albumData.title; });
      });
  }

  fetchAlbumData = () => {
    const { galleryHash } = this.props.match.params;
    return fetchAlbumData(galleryHash);
  }

  fetchCommentData = () => {
    const { galleryHash } = this.props.match.params;
    let sort;
    return fetchCommentData(galleryHash, sort);
  }

  handlePostedComment = (comment, CommentId) => {
    const { commentData, albumData } = this.state;
    const { id } = albumData;
    const { account_username: username } = this.context;
    const newCommentObj = {
      comment,
      author: username,
      id: CommentId,
      points: 1,
      image_id: id,
      children: [],
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
    let data;
    if (albumData) {
      const { ups, downs, views } = albumData;
      data = { ups, downs, views };
    }
    const { votedAlbum } = this.context;
    return (
      <div className="albumWrapper">
        { albumData ? (
          <this.renderAlbumData />
        ) : (
          <Loader fullScreen />
        )}
        <BottomBar albumId={galleryHash} data={data} voteType={votedAlbum[galleryHash]} />
        <CommentBox
          albumId={galleryHash}
          handleCommentUpdate={this.handlePostedComment}
        />

        { commentData ? (
          <Comments commentData={commentData} />
        ) : (
          <Loader />
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
