import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

class AuthCallback extends Component {
  static contextType = AuthContext;
  render() {
    const { access_token: accessToken, extractParamsAndSaveToLocalStorageAndState } = this.context;

    if (accessToken) { return <Redirect to="/dashboard" />; }

    // TODO: Validate the hash, and How to handle invalid hash?
    extractParamsAndSaveToLocalStorageAndState(this.props.location.hash);
    return <Redirect to="/" />;
  }
}

AuthCallback.propTypes = {
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    key: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    state: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
  }).isRequired,
};

export default AuthCallback;
