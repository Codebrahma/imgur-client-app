import React from "react";

const styles = {
  border: "0",
  borderRadius: "8px",
  cursor: "pointer",
  margin: "0.5rem",
  padding: "0.5rem"
};

const AuthButton = props => {
  return <button style={styles}>{props.children}</button>;
};

export default AuthButton;
