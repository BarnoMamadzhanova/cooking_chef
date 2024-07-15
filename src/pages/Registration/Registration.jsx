import React from "react";
import classes from "./Registration.module.css";
import Welcome from "../../components/Welcome/Welcome";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

function Registration() {
  return (
    <div className={classes.registration}>
      <Welcome>
        <h2 className={classes.welcome_title}>Sign up for delicious</h2>
        <h2 className={classes.welcome_title}>
          <strong>Discoveries!</strong>
        </h2>
      </Welcome>
      <RegisterForm />
    </div>
  );
}

export default Registration;
