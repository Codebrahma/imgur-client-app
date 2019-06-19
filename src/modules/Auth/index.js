import React, { Component } from 'react';
// import axios from "axios";
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

    console.log(authorizationUrl);

    window.location.href = authorizationUrl;
  };

  render() {
    return (
    // <div>
    // {/* { localStorage.getItem('access_token') && (<h1>Loggged</h1>) } */}
      <Button handleClick={this.startAuthorization}>Connect with Imgur</Button>
    // </div>
    );
  }
}

export default Auth;
