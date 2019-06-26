import React from 'react';
import Media from '../../components/Media';
import BottomBar from '../../components/BottomBar';
import CommentBox from '../../components/CommentBox';
import './album.scss';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    const { images } = this.props.location.state;
    return (
      <div className="albumWrapper">
        {images ? (
          images.map(image => <Media key={image.bandwidth} content={image} />)
        ) : (
          <Media key={this.props.location.state.id} content={this.props.location.state} />
        )}
        <BottomBar />
        <CommentBox />
      </div>
    );
  }
}
export default Album;
