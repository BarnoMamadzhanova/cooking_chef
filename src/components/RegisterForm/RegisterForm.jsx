import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerSchema } from "../../schemas/registerSchema";
import { visible, invisible, mail, user_input } from "../../assests/index";
import classes from "./RegisterForm.module.css";

function RegisterForm() {
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
      username: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values, actions) => {
      try {
        console.log("Registration was successful", values);
        navigate("/");
      } catch (error) {
        console.log("Registration failed", error);
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
    <div className={classes.register_container}>
      <form className={classes.register_form} onSubmit={handleSubmit}>
        <div className={classes.label_container}>
          <label htmlFor="username">Name</label>
          <div
            className={`${classes.input_container} ${
              errors.username && touched.username ? classes.error : ""
            }`}
          >
            <input
              value={values.username}
              onChange={handleChange}
              type="text"
              id="username"
              placeholder="Enter your name"
              onBlur={handleBlur}
              className={
                errors.username && touched.username ? classes.inputError : ""
              }
            />
            <img
              src={user_input}
              alt="user"
              className={classes.register_user}
            />
          </div>
        </div>
        {errors.username && touched.username && (
          <div className={classes.error_message}>{errors.username}</div>
        )}

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
            <img src={mail} alt="mail" className={classes.register_mail} />
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

        <div className={classes.label_container}>
          <label htmlFor="rePassword">Re-Password</label>
          <div
            className={`${classes.input_container} ${
              errors.rePassword && touched.rePassword ? classes.error : ""
            }`}
          >
            <input
              value={values.rePassword}
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              id="rePassword"
              placeholder="Re-Enter your Password"
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
        {errors.rePassword && touched.rePassword && (
          <div className={classes.error_message}>{errors.rePassword}</div>
        )}

        <button type="submit" disabled={isSubmitting} onSubmit={handleSubmit}>
          Sign In
        </button>
        {/* {errorMessage && (
            <div className={classes.formErrorMessage}>{errorMessage}</div>
          )} */}
      </form>
      <div className={classes.link_box}>
        <p>Already have an account?</p>
        <Link to="/registration" className={classes.register_link}>
          Sign In Now
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
