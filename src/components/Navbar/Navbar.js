import React from "react";
import logo from "../../svgs/logo";
import AuthButton from "../AuthButton";

const Navbar = () => (
  <nav>
    {logo}
    <AuthButton>
      Connect with Imgur
    </AuthButton>
  </nav>
);
export default Navbar;
