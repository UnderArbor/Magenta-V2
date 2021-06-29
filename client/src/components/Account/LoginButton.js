import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";

import Modal from "react-modal";

const LoginButton = ({
  loginUser,
  errors,
  errorVariant,
  undoError,
  setErrors,
  loginIsOpen,
  setLoginOpen,
  openLogin,
  openRegister,
}) => {
  function closeLogin() {
    setErrors({
      userName: "",
      email: "",
      password: "",
      matchingPassword: "",
    });
    setLoginOpen(false);
  }

  const [formData, setFormData] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  const { loginEmail, loginPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const success = loginUser(loginEmail, loginPassword);
    if (await success) {
      closeLogin();
    }
  };

  const customStyles = {
    overlay: { zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.6)" },
  };

  return (
    <Fragment>
      <button onClick={() => openLogin()} className="loginLink">
        Login
      </button>
      <Modal
        closeTimeoutMS={300}
        isOpen={loginIsOpen}
        ariaHideApp={false}
        style={customStyles}
        onRequestClose={closeLogin}
        contentLabel="exampleModal"
        className="modal"
      >
        <form
          className="authForm login-form"
          onSubmit={(e) => {
            onLogin(e);
          }}
        >
          <div className="authHeader">Login</div>
          <div className="form-group">
            <div className="form-row">
              <p className="form-label">Email:</p>
              <input
                className={`authInput ${
                  errors["email"].length > 0 && "errorInput"
                }`}
                type="email"
                placeholder="example@email.com"
                name="loginEmail"
                value={loginEmail}
                onChange={(e) => onChange(e)}
                required
                onFocus={() => undoError("email")}
              />
              {errors["email"].length > 0 && (
                <motion.div
                  className="errorBar"
                  variants={errorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors["email"]}
                </motion.div>
              )}
            </div>
            <div className="form-row">
              <p className="form-label">Password:</p>
              <input
                className={`authInput ${
                  errors["password"].length > 0 && "errorInput"
                }`}
                type="password"
                placeholder="********"
                name="loginPassword"
                value={loginPassword}
                onChange={(e) => onChange(e)}
                required
                onFocus={() => undoError("password")}
              />
              {errors["password"].length > 0 && (
                <motion.div
                  className="errorBar"
                  variants={errorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors["password"]}
                </motion.div>
              )}
            </div>
          </div>
          <div className="authButtons">
            <button className="authButton" onClick={(e) => onLogin(e)}>
              Log In
            </button>
            <p
              className="otherAuthText"
              onClick={() => {
                openRegister();
                closeLogin();
              }}
            >
              Need to register?
            </p>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default LoginButton;
