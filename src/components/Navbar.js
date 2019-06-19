import React from "react";
import logo from "../svgs/logo";
import { Auth } from "../modules";

const Navbar = () => (
  <nav>
    <div className="container">
      {logo}
      <Auth />
    </div>
  </nav>
);
export default Navbar;
