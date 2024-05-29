// contacts

import { useErrorStore } from "../../stores/errorStore";
import { useUserStore } from "../../stores/userStore";
import { useValidationStore } from "../../stores/validationStore";

export const checkFirstTabFields = () => {};

export const checkAllFirstTabFieldsValid = () => {
  const Register = useValidationStore.getState().Register;
  return ![
    Register.firstName,
    Register.lastName,
    Register.surname,
    Register.phoneNumber,
    Register.email,
    Register.password,
    Register.birthDate,
    Register.confirmPassword,
  ].some((x) => x === false);
};
export const isFieldValid = (fieldName, value) => {
  const setRegisterError = useErrorStore.getState().setRegisterError;
  const setRegisterFieldValidity =
    useValidationStore.getState().setRegisterFieldValidity;
  if (fieldName === "firstName") {
    const isValid = value?.trim().length <= 50 && value?.trim().length > 0;
    setRegisterFieldValidity("firstName", isValid);

    !isValid
      ? setRegisterError("firstName", "Required with max length of 50 symbols.")
      : setRegisterError("firstName", "");
  }
  if (fieldName === "surname") {
    const isValid = value?.trim().length <= 50 && value?.trim().length > 0;
    setRegisterFieldValidity("surname", isValid);
    !isValid
      ? setRegisterError("surname", "Required with max length of 50 symbols.")
      : setRegisterError("surname", "");
  }
  if (fieldName === "lastName") {
    const isValid = value?.trim().length <= 50 && value?.trim().length > 0;
    setRegisterFieldValidity("lastName", isValid);
    !isValid
      ? setRegisterError("lastName", "Required with max length of 50 symbols.")
      : setRegisterError("surname", "");
  }

  if (fieldName === "birthDate") {
    if (!value) {
      setRegisterError("birthDate", "Birth date is mandatory.");
      setRegisterFieldValidity("birthDate", false);
    } else {
      const date = new Date(value);
      const currentDate = new Date();

      if (date > currentDate) {
        setRegisterFieldValidity("birthDate", false);
        setRegisterError("birthDate", "Birth date cannot be future date.");
        return;
      }
      const minimumYear = new Date().getFullYear() - 18;

      if (date.getFullYear() > minimumYear) {
        setRegisterFieldValidity("birthDate", false);
        setRegisterError("birthDate", "Must be at least 18.");
      } else {
        setRegisterFieldValidity("birthDate", true);
        setRegisterError("birthDate", "");
      }
    }
  }
  if (fieldName === "email") {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(value);
    setRegisterFieldValidity("email", isValid);
    !isValid
      ? setRegisterError("email", "Wrong email format")
      : setRegisterError("email", "");
  }
  if (fieldName === "phoneNumber") {
    if (!value) return true;
    const phoneRegex = /^\+[1-9]{3}[0-9]{6,15}$/;
    const isValid = phoneRegex.test(value);
    setRegisterFieldValidity(isValid);
    !isValid
      ? setRegisterError("phoneNumber", "Wrong phone number format.")
      : setRegisterError("phoneNumber", "");
  }
  if (fieldName === "password") {
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    const isValid = passwordRegex.test(value);
    setRegisterFieldValidity("password", isValid);
    !isValid
      ? setRegisterError("password", "Password is too weak.")
      : setRegisterError("password", "");
  }
  if (fieldName === "confirmPassword") {
    const password = useUserStore.getState().Customer.password;
    const isValidPassword = useValidationStore.getState().Customer.password;
    if (password && isValidPassword) {
      const match = value === password;
      setRegisterFieldValidity("confirmPassword", match);
      match
        ? setRegisterError("confirmPassword", "")
        : setRegisterError("confirmPassword", "Passwords don't match.");
    } else {
      setRegisterError("confirmPassword", "");
      setRegisterFieldValidity("confirmPassword", true);
    }
  }
};
