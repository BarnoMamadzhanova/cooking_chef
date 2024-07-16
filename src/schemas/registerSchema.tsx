import * as yup from "yup";

const usernamePattern = /^[a-zA-Z0-9_]+$/;

const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .matches(emailPattern, "Please enter a valid email")
    .required("Required"),
  username: yup
    .string()
    .min(3, "User name must contain at least 3 letters")
    .max(20, "User name must contain no more than 20 letters")
    .matches(
      usernamePattern,
      "User name must consist only of letters and numbers"
    )
    .required("Required"),
  password: yup
    .string()
    .min(8, "Password must contain at least 8 characters")
    .max(15, "Password must contain no more than 15 characters")
    .matches(
      passwordPattern,
      "Password must contain at least one special character, one lowercase and one uppercase letter"
    )
    .required("Required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords don't match")
    .required("Required"),
});
