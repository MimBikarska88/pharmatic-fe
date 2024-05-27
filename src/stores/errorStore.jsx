import { create } from "zustand";

// each page is a nested object that contains validation states for fields
const initialStore = {
  RegisterErrors: {
    firstName: "",
    lastName: "",
    surname: "",
    birthDate: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  },
};
export const useErrorStore = create((set) => ({
  ...initialStore,
  setRegisterError: (fieldName, fieldValue) =>
    set((state) => ({
      ...state,
      RegisterErrors: {
        ...state.RegisterErrors,
        [`${fieldName}`]: fieldValue,
      },
    })),
}));
