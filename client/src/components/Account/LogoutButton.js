import React from "react";

import { useHistory } from "react-router-dom";

const LogoutButton = ({ logoutUser }) => {
  let history = useHistory();
  return (
    <button
      onClick={() => {
        history.push("/");
        logoutUser();
      }}
      className="authLink logout largeDiv"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
