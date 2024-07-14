import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { visible, invisible, mail } from "../../assests/index";
import classes from "./LoginForm.module.css";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={classes.login_container}>
      <form className={classes.login_form}>
        <div className={classes.label_container}>
          <label htmlFor="username">Email</label>
          <div className={classes.input_container}>
            <input
              // value={values.username}
              // onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter your email"
              // onBlur={handleBlur}
            />
            <img src={mail} alt="mail" className={classes.login_mail} />
          </div>
        </div>

        <div className={classes.label_container}>
          <label htmlFor="password">Password</label>
          <div className={classes.input_container}>
            <input
              // value={values.password}
              // onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              // onBlur={handleBlur}
            />
            <img
              src={passwordVisible ? visible : invisible}
              alt="Toggle visibility"
              className={classes.password_toggle_icon}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>

        <button
          type="submit"
          //   disabled={isSubmitting}
          //   onSubmit={handleFormSubmit}
        >
          Sign In
        </button>
        {/* {errorMessage && (
          <div className={classes.formErrorMessage}>{errorMessage}</div>
        )} */}
      </form>
      <div>
        <p>I don’t have an account?</p>
        <Link to="/registration" className={classes.login_link}>
          Sign Up Now
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
