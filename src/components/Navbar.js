import React from "react";
import logo from "../svgs/logo";
import { Auth } from "../modules";
import { Grid } from "react-flexbox-grid";

const Navbar = () => (
  <nav>
    {/* <div className="container"> */}
    <Grid>
      {logo}
      <Auth />
    </Grid>
    {/* </div> */}
  </nav>
);
export default Navbar;
