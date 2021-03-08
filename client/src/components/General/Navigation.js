import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { produce } from "immer";

import HomeLogo from "./HomeLogo";
import RegisterButton from "../Account/RegisterButton";
import LoginButton from "../Account/LoginButton";
import LogoutButton from "../Account/LogoutButton";
import DeckListButton from "../Buttons/DeckListButton";
import BuilderButton from "./BuilderButton";

import { registerUser, loginUser, logoutUser } from "../../actions/auth";

const Navigation = ({
  openDeckList,
  toggleDeckList,
  isAuthenticated,
  user,
  authErrors,
  registerUser,
  loginUser,
  logoutUser,
}) => {
  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    matchingPassword: "",
  });

  useEffect(() => {
    if (authErrors !== undefined) {
      const newErrors = produce(errors, (draft) => {
        for (var i = 0; i < authErrors.length; ++i) {
          draft[authErrors[i].param] = authErrors[i].msg;
        }
      });
      setErrors(newErrors);
    }
  }, [authErrors]);

  const undoError = (errorName) => {
    switch (errorName) {
      case "userName":
        return setErrors({ ...errors, userName: "" });
      case "email":
        return setErrors({ ...errors, email: "" });
      case "password":
        return setErrors({ ...errors, password: "" });
    }
  };

  const errorVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
    exit: {
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="navContainer">
      <HomeLogo position={true} />
      {openDeckList !== undefined ? (
        <DeckListButton
          toggleDeckList={toggleDeckList}
          openDeckList={openDeckList}
        />
      ) : (
        <BuilderButton navBoolean={true} />
      )}
      <div className="authLinks">
        {!isAuthenticated || user === null ? (
          <Fragment>
            <LoginButton
              loginUser={loginUser}
              errors={errors}
              errorVariant={errorVariant}
              undoError={undoError}
              setErrors={setErrors}
            />
            <p style={{ margin: "0 4px" }} className="authLink">
              |
            </p>
            <RegisterButton
              registerUser={registerUser}
              errors={errors}
              errorVariant={errorVariant}
              undoError={undoError}
              setErrors={setErrors}
            />
          </Fragment>
        ) : (
          <Fragment>
            <div className="userButton notAllowed">
              <p>Welcome, {user.userName}</p>
            </div>
            <LogoutButton logoutUser={logoutUser} />
          </Fragment>
        )}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object,
  authErrors: PropTypes.array,
  registerUser: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  authErrors: state.auth.authErrors,
});

export default connect(mapStateToProps, {
  registerUser,
  loginUser,
  logoutUser,
})(Navigation);
