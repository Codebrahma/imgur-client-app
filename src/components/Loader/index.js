import React from 'react';
import PropTypes from 'prop-types';
import './loader.scss';

const Loader = (props) => {
  const { fullScreen } = props;
  return (
    <div
      className={
        fullScreen
          ? 'loaderContainer loaderContainer--fullScreen'
          : 'loaderContainer'
      }
    >
      <div className="loader" />
    </div>
  );
};

Loader.propTypes = {
  fullScreen: PropTypes.bool,
};

Loader.defaultProps = {
  fullScreen: false,
};

export default Loader;
