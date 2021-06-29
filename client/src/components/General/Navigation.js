import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { produce } from "immer";
import { AnimatePresence, motion } from "framer-motion";

import HomeLogo from "./HomeLogo";
import RegisterButton from "../Account/RegisterButton";
import LoginButton from "../Account/LoginButton";
import LogoutButton from "../Account/LogoutButton";
import BuilderButton from "./BuilderButton";

import { registerUser, loginUser, logoutUser } from "../../actions/auth";

const Navigation = ({
  openDeckList,
  isAuthenticated,
  user,
  authErrors,
  registerUser,
  loginUser,
  logoutUser,
  mainPage,
  navSticky,
  buildSticky,
}) => {
  const [registerIsOpen, setRegisterOpen] = useState(false);
  const [loginIsOpen, setLoginOpen] = useState(false);

  function openRegister() {
    setRegisterOpen(true);
  }

  function openLogin() {
    setLoginOpen(true);
  }

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
      opacity: 0,
      transition: {
        duration: 0.05,
        ease: "easeOut",
      },
    },
  };

  const navVariant = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "linear",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "linear",
      },
    },
  };

  let navStyles = {};

  if (!mainPage) {
    navStyles = {
      position: "relative",
    };
  }

  return (
    <div className="navContainer" style={navStyles}>
      <AnimatePresence exitBeforeEnter>
        {mainPage && navSticky && (
          <motion.div
            className="navColor"
            variants={navVariant}
            initial="hidden"
            animate="visible"
            exit="exit"
          />
        )}
      </AnimatePresence>
      <HomeLogo position={true} />
      {/* <button onClick={() => document.body.requestFullscreen()}>
        Fullscreen
      </button> */}
      <AnimatePresence exitBeforeEnter>
        {openDeckList !== undefined ? (
          <Link to="/decks" className="headerButton decklistEnter">
            Deck List
          </Link>
        ) : buildSticky === true || buildSticky === undefined ? (
          <BuilderButton navVariant={navVariant} buildSticky={buildSticky} />
        ) : null}
      </AnimatePresence>
      <div className="authLinks">
        {!isAuthenticated || user === null ? (
          <Fragment>
            <LoginButton
              loginUser={loginUser}
              errors={errors}
              errorVariant={errorVariant}
              undoError={undoError}
              setErrors={setErrors}
              loginIsOpen={loginIsOpen}
              setLoginOpen={setLoginOpen}
              openLogin={openLogin}
              openRegister={openRegister}
            />
            <RegisterButton
              registerUser={registerUser}
              errors={errors}
              errorVariant={errorVariant}
              undoError={undoError}
              setErrors={setErrors}
              registerIsOpen={registerIsOpen}
              setRegisterOpen={setRegisterOpen}
              openRegister={openRegister}
              openLogin={openLogin}
            />
          </Fragment>
        ) : (
          <Fragment>
            <div className="userButton">
              <p className="userGreeting">Welcome, {user.userName}</p>
              <LogoutButton logoutUser={logoutUser} />
            </div>
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
