import React, { Component } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { location, history } from '../../routerPropTypes';

class AuthCallback extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    const { extractParamsAndSaveToLocalStorageAndState } = this.context;

    extractParamsAndSaveToLocalStorageAndState(this.props.location.hash);

    // axios({
    //   method: 'get',
    //   url: `https://api.imgur.com/3/account/${username}`,
    //   headers: { Authorization: `Client-ID ${process.env.CLIENT_ID}` },
    // }).then((res) => {
    //   localStorage.setItem('data', JSON.stringify(res.data.data));
    //   this.props.history.push('/');
    // });
  }

  componentDidUpdate() {
    const { account_username: username, extractParamsAndSaveToLocalStorageAndState } = this.context;

    if (username) {
      this.props.history.push('/');
    }
  }

  render() {
    return <h1>Loading... (This should be a full page loader)</h1>;
  }
}

AuthCallback.propTypes = {
  location: location.isRequired,
  history: history.isRequired,
};

export default AuthCallback;
