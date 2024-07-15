import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/loginSchema";
import { visible, invisible, mail } from "../../assests/index";
import classes from "./LoginForm.module.css";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values, actions) => {
      try {
        console.log("Login successful", values);
        navigate("/home");
      } catch (error) {
        console.log("Login failed", error);
      } finally {
        actions.resetForm();
      }
    },
    validateOnChange: true,
    validateOnBlur: true,
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className={classes.login_container}>
      <form className={classes.login_form} onSubmit={handleSubmit}>
        <div className={classes.label_container}>
          <label htmlFor="email">Email</label>
          <div
            className={`${classes.input_container} ${
              errors.email && touched.email ? classes.error : ""
            }`}
          >
            <input
              value={values.email}
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Enter your email"
              onBlur={handleBlur}
            />
            <img src={mail} alt="mail" className={classes.login_mail} />
          </div>
        </div>
        {errors.email && touched.email && (
          <div className={classes.error_message}>{errors.email}</div>
        )}

        <div className={classes.label_container}>
          <label htmlFor="password">Password</label>
          <div
            className={`${classes.input_container} ${
              errors.password && touched.password ? classes.error : ""
            }`}
          >
            <input
              value={values.password}
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              onBlur={handleBlur}
            />
            <img
              src={passwordVisible ? visible : invisible}
              alt="Toggle visibility"
              className={classes.password_toggle_icon}
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        {errors.password && touched.password && (
          <div className={classes.error_message}>{errors.password}</div>
        )}

        <button type="submit" disabled={isSubmitting} onSubmit={handleSubmit}>
          Sign In
        </button>
        {/* {errorMessage && (
          <div className={classes.formErrorMessage}>{errorMessage}</div>
        )} */}
      </form>
      <div className={classes.link_box}>
        <p>I don’t have an account?</p>
        <Link to="/registration" className={classes.login_link}>
          Sign Up Now
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
