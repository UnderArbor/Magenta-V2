import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";

import Modal from "react-modal";

const LoginButton = ({
  loginUser,
  errors,
  errorVariant,
  undoError,
  setErrors,
}) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setErrors({
      userName: "",
      email: "",
      password: "",
      matchingPassword: "",
    });
    setIsOpen(false);
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
      closeModal();
    }
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  return (
    <Fragment>
      <button onClick={() => openModal()} className="authLink">
        Login
      </button>
      <Modal
        closeTimeoutMS={300}
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="exampleModal"
        appElement={document.getElementById("modal-root")}
        disabled="disabled"
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
                placeholder="user@example.com"
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
            <p className="otherAuthText notAllowed">Need to register?</p>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default LoginButton;
