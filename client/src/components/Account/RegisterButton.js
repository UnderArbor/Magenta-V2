import React, { useState, Fragment } from "react";
import { motion } from "framer-motion";

import Modal from "react-modal";

const RegisterButton = ({
  registerUser,
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
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerPasswordConfirm: "",
  });

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPasswordConfirm,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerPasswordConfirm) {
      setErrors({ ...errors, matchingPassword: "Passwords must match" });
    } else {
      const success = registerUser(
        registerName,
        registerEmail,
        registerPassword
      );
    }
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  return (
    <Fragment>
      <button onClick={() => openModal()} className="authLink">
        Register
      </button>
      <Modal
        closeTimeoutMS={300}
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="exampleModal"
        appElement={document.getElementById("root")}
        className="modal"
      >
        <form
          className="authForm register-form"
          onSubmit={(e) => {
            onRegister(e);
          }}
        >
          <div className="authHeader">Register</div>
          <div className="form-group">
            <div className="form-row">
              <p className="form-label">Name:</p>
              <input
                className={`authInput ${
                  errors["userName"].length > 0 && "errorInput"
                }`}
                type="text"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={(e) => onChange(e)}
                required
                onFocus={() => undoError("userName")}
              />
              {errors["userName"].length > 0 && (
                <motion.div
                  className="errorBar"
                  variants={errorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors["userName"]}
                </motion.div>
              )}
            </div>

            <div className="form-row">
              <p className="form-label">Email:</p>
              <input
                className={`authInput ${
                  errors["email"].length > 0 && "errorInput"
                }`}
                type="email"
                placeholder="Email Address"
                name="registerEmail"
                value={registerEmail}
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
                placeholder="Password"
                name="registerPassword"
                minLength="6"
                value={registerPassword}
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

            <div className="form-row">
              <p className="form-label">Confirm Password:</p>
              <input
                className={`authInput ${
                  errors["matchingPassword"].length > 0 && "errorInput"
                }`}
                type="password"
                placeholder="Confirm Password"
                name="registerPasswordConfirm"
                minLength="6"
                value={registerPasswordConfirm}
                onChange={(e) => onChange(e)}
                required
              />
              {errors["matchingPassword"].length > 0 && (
                <motion.div
                  className="errorBar"
                  variants={errorVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {errors["matchingPassword"]}
                </motion.div>
              )}
            </div>
          </div>
          <div className="authButtons">
            <button className="authButton" onClick={(e) => onRegister(e)}>
              Register
            </button>
            <p className="otherAuthText notAllowed">Already registered?</p>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default RegisterButton;
