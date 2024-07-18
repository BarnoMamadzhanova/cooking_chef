import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { loginUser, selectAuthState } from "../../redux/auth/authSlice";
import { loginSchema } from "../../schemas/loginSchema";
import { visible, invisible, mail } from "../../assests/index";
import classes from "./LoginForm.module.css";

function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(selectAuthState);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

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
    onSubmit: async (values, actions) => {
      setErrorMessage(null);
      try {
        const resultAction = await dispatch(loginUser(values));
        if (loginUser.fulfilled.match(resultAction)) {
          console.log("Login was successful");
          navigate("/home");
        } else {
          if (resultAction.payload) {
            setErrorMessage(resultAction.payload as string);
          } else {
            setErrorMessage("Login failed, please try again.");
          }
        }
      } catch (error) {
        setErrorMessage("Login failed, please try again.");
      } finally {
        actions.setSubmitting(false);
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

        {errorMessage && (
          <div className={classes.formErrorMessage}>{errorMessage}</div>
        )}

        <button type="submit" disabled={isSubmitting || isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
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
