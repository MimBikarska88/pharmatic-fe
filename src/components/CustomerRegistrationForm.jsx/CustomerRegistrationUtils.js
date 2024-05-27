// contacts

import { useErrorStore } from "../../stores/errorStore";
import { useUserStore } from "../../stores/userStore";
import { useValidationStore } from "../../stores/validationStore";

export const checkFirstTabFields = () => {};
export const isFieldValid = (fieldName, value) => {
  const setRegisterError = useErrorStore.getState().setRegisterError;
  if (fieldName === "firstName") {
    if (!value) {
      setRegisterError("firstName", "First Name is mandatory.");
    }
    return !(!value || value.trim() === "" || value.length > 50);
  }
  if (fieldName === "surname") {
    return !(!value || value.trim() === "" || value.length > 50);
  }
  if (fieldName === "lastName") {
    return !(!value || value.trim() === "" || value.length > 50);
  }
  if (fieldName === "firstName") {
    return !(!value || value.trim() === "" || value.length > 50);
  }
  if (fieldName === "birthDate") {
    if (!value || value.trim() === "") {
      return false;
    }

    const date = new Date(value);
    const currentDate = new Date();

    if (date > currentDate) {
      return false;
    }
    const minimumYear = new Date().getFullYear() - 18;

    if (date.getFullYear() > minimumYear) {
      return false;
    }
    return true;
  }
  if (fieldName === "email") {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(value);
  }
  if (fieldName === "phoneNumber") {
    if (!value) return true;
    const phoneRegex = /^\+[1-9]{3}[0-9]{6,15}$/;
    return phoneRegex.test(value);
  }
  if (fieldName === "password") {
    const passwordRegex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    return passwordRegex.test(value);
  }
  if (fieldName === "confirmPassword") {
    const password = useUserStore.getState().Customer.password;
    const isValidPassword = useValidationStore.getState().Customer.password;
    if (!password || !isValidPassword) {
      return true;
    }
    return value === password;
  }
};
