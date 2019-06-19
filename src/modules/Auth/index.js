import React, { Component } from "react";
import axios from "axios";
import Button from "../../components/Button";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  startAuthorization = () => {
    // https://api.imgur.com/oauth2/authorize?client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE
    alert("Start Authorization");
  };

  render() {
    console.log(process.env.CLIENT_ID);
    return (
      <Button handleClick={this.startAuthorization}>
        Connect with Imgur
      </Button>
      
    );
  }
}

export default Auth;
