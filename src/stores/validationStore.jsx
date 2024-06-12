import { create } from "zustand";
import { roleType } from "../utils/roleTypes";
import { immer } from "zustand/middleware/immer";

// each page is a nested object that contains validation states for fields
const initialStore = {
  firstName: true,
  lastName: true,
  surname: true,
  birthDate: true,
  phoneNumber: true,
  password: true,
  confirmPassword: true,
  detailedAddress: true,
  country: true,
  postcode: true,
  city: true,
};

export const useValidationStore = create(
  immer((set) => ({
    Register: { ...initialStore },

    setRegisterFieldValidity: (fieldName, fieldValue) =>
      set((state) => {
        state.Register[`${fieldName}`] = fieldValue;
      }),

    setAddressIncorrectFormat: () =>
      set((state) => {
        state.Register.detailedAddress = false;
        state.Register.country = false;
        state.Register.postcode = false;
        state.Register.city = false;
      }),
    setAddressCorrectFormat: () =>
      set((state) => {
        state.Register.detailedAddress = true;
        state.Register.country = true;
        state.Register.postcode = true;
        state.Register.city = true;
      }),
  }))
);
