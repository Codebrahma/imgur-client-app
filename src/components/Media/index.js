import React from 'react';
import LazyLoad from 'react-lazy-load';

import './media.scss';

class Media extends React.Component {
  constructor() {
    super();
    this.state = {

    };
  }
  render() {
    const { content } = this.props;
    return (
      <div>
        {content.type === 'video/mp4' ? (
          <LazyLoad>
            <video autoPlay loop className="media" controls autoPlay>
              <source src={content.mp4} />
            </video>
          </LazyLoad>
        ) : (
          <LazyLoad>
            <img className="image" src={content.link} alt="img" />
          </LazyLoad>
        )}
      </div>
    );
  }
}

export default Media;
