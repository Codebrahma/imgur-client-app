import React from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
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
          <video autoPlay loop className="image" controls autoPlay muted>
            <source src={content.mp4} />
          </video>
        ) : (
          <img className="image" src={content.link} alt="img" />
        )}
      </LazyLoad>
    );
  }
}

Media.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
}
export default Media;
