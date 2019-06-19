import React from 'react';
import { Grid } from 'react-flexbox-grid';
import logo from '../svgs/logo';
import { Auth } from '../modules';

const Navbar = () => (
  <nav>
    <Grid>
      <a href="/">
        {logo}
      </a>

      { localStorage.getItem('access_token') ?
        <h1>Hi, {localStorage.getItem('account_username')}</h1> :
        <Auth /> }

    </Grid>
  </nav>
);
export default Navbar;
