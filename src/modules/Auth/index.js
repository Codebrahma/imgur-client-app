import React, { Component } from 'react';
import Button from '../../components/Button';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startAuthorization = () => {
    const authorizationUrl = `https://api.imgur.com/oauth2/authorize?client_id=${
      process.env.CLIENT_ID
    }&response_type=token`;

    window.location.href = authorizationUrl;
  };

  render() {
    return (
      <Button handleClick={this.startAuthorization}>Connect with Imgur</Button>
    );
  }
}

export default Auth;
