import React, { ComponentType } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface Props {
  [key: string]: any;
}

const withAuthProtection = (Component: ComponentType<Props>) => {
  return (props: Props) => {
    const isLoggedIn = useSelector(
      (state: RootState) => !!state.auth.accessToken
    );

    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };
};

export default withAuthProtection;
