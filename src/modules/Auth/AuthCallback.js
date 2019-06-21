import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { location } from '../../routerPropTypes';

class AuthCallback extends Component {
  static contextType = AuthContext;
  render() {
    const { access_token: accessToken, extractParamsAndSaveToLocalStorageAndState } = this.context;

    if (accessToken) { return <Redirect to="/dashboard" />; }

    // TODO: Validate the hash, and How to handle invalid hash?
    extractParamsAndSaveToLocalStorageAndState(this.props.location.hash);
    return <Redirect to="/dashboard" />;
  }
}

AuthCallback.propTypes = {
  location: location.isRequired,
};

export default AuthCallback;
