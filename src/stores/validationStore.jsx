import { create } from "zustand";
import { roleType } from "../utils/roleTypes";

// each page is a nested object that contains validation states for fields
const initialStore = {
  Register: {
    firstName: true,
    lastName: true,
    surname: true,
    birthDate: true,
    phoneNumber: true,
    password: true,
    confirmPassword: true,
  },
};
export const useValidationStore = create((set) => ({
  ...initialStore,
  setRegisterFieldValidity: (fieldName, fieldValue) =>
    set((state) => ({
      ...state,
      Register: {
        ...state.Register,
        [`${fieldName}`]: fieldValue,
      },
    })),
}));
