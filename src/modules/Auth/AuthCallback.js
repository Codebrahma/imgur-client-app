import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { location } from '../../routerPropTypes';

class AuthCallback extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isInvalidHash: !this.isValidHash(this.props.location.hash),
    };
  }


  componentDidMount() {
    const {
      access_token: accessToken,
      extractParamsAndSaveToLocalStorageAndState,
    } = this.context;
    if (!accessToken) {
      extractParamsAndSaveToLocalStorageAndState(this.props.location.hash);
    }
  }

  isValidHash = hash => /^#access_token=[a-z\d]+&expires_in=\d+&token_type=bearer&refresh_token=[a-z\d]+&account_username=\w+&account_id=\d+$/.test(hash);

  render() {
    if (this.state.isInvalidHash) return <Redirect to="/" />;

    const {
      access_token: accessToken,
      account_username: username,
    } = this.context;

    // REDIRECT TO A FIXED ROUTE:
    // TODO: Get it working for Private Routes.
    // If redirected from Private Route with location.state props, redirect there after login.
    // Or redirect to the default path.
    const { from } = this.props.location.state || { from: { pathname: `/user/${username}` } };
    if (accessToken) return <Redirect to={from} />;

    // REDIRECT TO WHATEVER ROUTE THE USER PREVIOUSLY WAS:
    // BUG: This is reloading the entire app.
    // if (accessToken) this.props.history.goBack();

    return 'Loading';
  }
}

AuthCallback.propTypes = {
  location: location.isRequired,
  // history: history.isRequired,
};

export default AuthCallback;
