import React, { Component } from "react";
import imgur from "../assets/Imgur_logo.svg";
import logo from "../svgs/logo.js";
import close from "../svgs/close";
import FloatingButton from "./FloatingButton";
import AuthButton from "./AuthButton";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="auth">
        <img src={imgur} alt="imgur" />

        <AuthButton>Connect with Imgur</AuthButton>

        <FloatingButton handleClick={this.props.history.goBack}>
          {close}
        </FloatingButton>
      </section>
    );
  }
}

export default Auth;
