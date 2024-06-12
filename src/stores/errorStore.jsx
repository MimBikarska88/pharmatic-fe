import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

// each page is a nested object that contains validation states for fields
const initialStore = {
  firstName: "",
  lastName: "",
  surname: "",
  birthDate: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
};

export const useErrorStore = create(
  immer((set) => ({
    RegisterErrors: { ...initialStore },

    setRegisterError: (fieldName, fieldValue) =>
      set((state) => {
        state.RegisterErrors[`${fieldName}`] = fieldValue;
      }),
  }))
);
