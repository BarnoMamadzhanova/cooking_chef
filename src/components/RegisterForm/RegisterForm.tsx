import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch } from "../../redux/hook";
import { registerSchema } from "../../schemas/registerSchema";
import { registerUser } from "../../redux/auth/authSlice";
import { visible, invisible, mail, user_input } from "../../assests/index";
import classes from "./RegisterForm.module.css";

function RegisterForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, actions) => {
      const { rePassword, ...registerValues } = values;
      try {
        await dispatch(registerUser(registerValues));
        console.log("Registration was successful");
        navigate("/");
      } catch (error) {
        console.log("Registration failed", error);
      } finally {
        actions.resetForm();
        setSubmitting(false);
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
          <label htmlFor="name">Name</label>
          <div
            className={`${classes.input_container} ${
              errors.name && touched.name ? classes.error : ""
            }`}
          >
            <input
              value={values.name}
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Enter your name"
              onBlur={handleBlur}
              className={errors.name && touched.name ? classes.inputError : ""}
            />
            <img
              src={user_input}
              alt="user"
              className={classes.register_user}
            />
          </div>
        </div>
        {errors.name && touched.name && (
          <div className={classes.error_message}>{errors.name}</div>
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

        <button type="submit" disabled={isSubmitting}>
          Sign In
        </button>
      </form>
      <div className={classes.link_box}>
        <p>Already have an account?</p>
        <Link to="/" className={classes.register_link}>
          Sign In Now
        </Link>
      </div>
    </div>
  );
}

export default RegisterForm;
