import React from "react";
import classes from "./Login.module.css";
import Welcome from "../../components/Welcome/Welcome";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <div className={classes.login}>
      <Welcome>
        <h2 className={classes.welcome_title}>Welcome Back</h2>
        <h2 className={classes.welcome_title}>
          To <strong>CooksCorner</strong>
        </h2>
      </Welcome>
      <LoginForm />
    </div>
  );
}

export default Login;
