import React from 'react';
import LazyLoad from 'react-lazy-load';

import './media.scss';

class Media extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { content } = this.props;
    return (
      <LazyLoad>
        {content.type === 'video/mp4' ? (
          <video autoPlay loop className="media" controls autoPlay muted>
            <source src={content.mp4} />
          </video>
        ) : (
          <img className="image" src={content.link} alt="img" />
        )}
      </LazyLoad>
    );
  }
}

export default Media;
