import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// const extractParams = (hash) => {
//   const destructed = hash.split(/&|=/g);
//   const data = {
//     [destructed[0].slice(1)]: destructed[1],
//   };
//   for (let i = 2; i < destructed.length; i += 2) {
//     data[destructed[i]] = destructed[i + 1];
//   }
//   return data;
// };

const extractParamsAndSaveToLocalStorage = (hash) => {
  const destructed = hash.split(/&|=/g);
  localStorage.setItem(destructed[0].slice(1), destructed[1]);
  for (let i = 2; i < destructed.length; i += 2) {
    localStorage.setItem(destructed[i], destructed[i + 1]);
  }
};

const AuthCallback = (props) => {
  extractParamsAndSaveToLocalStorage(props.location.hash);

  if (localStorage.getItem('access_token')) { return <Redirect to="/dashboard" />; }

  return <h3>Callback</h3>;
};

AuthCallback.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default AuthCallback;
