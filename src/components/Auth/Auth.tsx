import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useInput from "../../hooks/input";
import { signIn, signUp } from "../../state/action-creators";
import Card from "../shared/Card/Card";
import Input from "../shared/Input/Input";
import styles from "./Auth.module.css";

const Auth = () => {
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();

  const {
    enteredInput: enteredName,
    inputChangeHandler: nameChangeHandler,
    blurChangeHandler: nameBlurHandler,
    hasError: nameHasError,
    resetInput: resetName,
    isValid: nameIsValid,
  } = useInput(/^[a-zA-Z ]+$/); // eslint-disable-line

  const {
    enteredInput: enteredEmail,
    inputChangeHandler: emailChangeHandler,
    blurChangeHandler: emailBlurHandler,
    hasError: emailHasError,
    resetInput: resetEmail,
    isValid: emailIsValid,
  } = useInput(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/); // eslint-disable-line

  const {
    enteredInput: enteredPassword,
    inputChangeHandler: passwordChangeHandler,
    blurChangeHandler: passwordBlurHandler,
    hasError: passwordHasError,
    resetInput: resetPassword,
    isValid: passwordIsValid,
  } = useInput(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); // eslint-disable-line

  const {
    enteredInput: enteredConfirmPassword,
    inputChangeHandler: confirmPasswordChangeHandler,
    blurChangeHandler: confirmPasswordBlurHandler,
    hasError: confirmPasswordHasError,
    resetInput: resetConfirmPassword,
    isValid: confirmPasswordIsValid,
  } = useInput(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/); // eslint-disable-line

  const showSignupHandler = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowSignup((prevState) => !prevState);
    resetName();
    resetEmail();
    resetPassword();
    resetConfirmPassword();
  };

  let formIsValid = false;

  if (
    (showSignup &&
      nameIsValid &&
      emailIsValid &&
      passwordIsValid &&
      confirmPasswordIsValid) ||
    (!showSignup && emailIsValid && passwordIsValid)
  ) {
    formIsValid = true;
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      (showSignup &&
        nameIsValid &&
        emailIsValid &&
        passwordIsValid &&
        confirmPasswordIsValid &&
        enteredPassword === enteredConfirmPassword) ||
      (!showSignup && emailIsValid && passwordIsValid)
    ) {
      if (showSignup) {
        dispatch(
          signUp({
            name: enteredName,
            email: enteredEmail,
            password: enteredPassword,
          })
        );
      } else {
        dispatch(signIn({ email: enteredEmail, password: enteredPassword }));
      }
      resetName();
      resetEmail();
      resetPassword();
      resetConfirmPassword();
    }
  };

  const invalidClassName = nameHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;
  const invalidClassEmail = emailHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;
  const invalidClassPassword = passwordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;
  const invalidClassConfirmPassword = confirmPasswordHasError
    ? `${styles.input} ${styles.invalid}`
    : `${styles.input}`;

  const nameErrorText = nameHasError ? (
    <p className={styles.errorText}>Please enter a valid name</p>
  ) : null;
  const emailErrorText = emailHasError ? (
    <p className={styles.errorText}>Please enter a valid email address</p>
  ) : null;
  const passwordErrorText = passwordHasError ? (
    <p className={styles.errorText}>Please enter a valid password</p>
  ) : null;
  const confirmPasswordErrorText = confirmPasswordHasError ? (
    <p className={styles.errorText}>Please enter a valid password</p>
  ) : null;

  const buttonText = showSignup ? "SignUp" : "SignIn";
  const linkText = !showSignup ? "SignUp" : "SignIn";

  return (
    <React.Fragment>
      <AuthBackground />
      <div className={styles.authForm}>
        <Card className={styles.authCard}>
          <h2>{showSignup ? "SignUp" : "SignIn"}</h2>
          <form className={styles.form} onSubmit={submitHandler}>
            {showSignup && (
              <Input
                className={invalidClassName}
                type="text"
                placeholder="Name"
                value={enteredName}
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
              />
            )}
            {nameErrorText}
            <Input
              className={invalidClassEmail}
              type="email"
              placeholder="Email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
            {emailErrorText}
            <Input
              className={invalidClassPassword}
              type="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            {passwordErrorText}
            {showSignup && (
              <Input
                className={invalidClassConfirmPassword}
                type="password"
                placeholder="Confirm Password"
                value={enteredConfirmPassword}
                onChange={confirmPasswordChangeHandler}
                onBlur={confirmPasswordBlurHandler}
              />
            )}
            {confirmPasswordErrorText}
            <button
              type="submit"
              disabled={!formIsValid}
              className={styles.button}
            >
              {buttonText}
            </button>
            <span className={styles.span}>
              {showSignup
                ? "Already have an account ?"
                : "Don't have an account ?"}
              <Link
                onClick={showSignupHandler}
                className={styles.signupLink}
                to={showSignup ? "/login" : "/signup"}
              >
                {linkText}
              </Link>
            </span>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

const AuthBackground = () => {
  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.appName}>JSCODEPAD</h2>
      </div>
    </div>
  );
};

export default Auth;
