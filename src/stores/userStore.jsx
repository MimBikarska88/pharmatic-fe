import { create } from "zustand";
import { roleType } from "../utils/roleTypes";

const initialStore = {
  role: roleType.guest,

  Admin: {},
  Customer: {
    firstName: "",
    lastName: "",
    surname: "",
    birthDate: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    detailedAddress: "",
    country: "",
    city: "",
    zipCode: "",
    street: "",
  },
  SoleProprietor: {},
  Organization: {},
};
export const useUserStore = create((set) => ({
  ...initialStore,

  setRole: (newRole) =>
    set((state) => ({
      role: newRole,
    })),

  setCustomerUserField: (fieldName, fieldValue) =>
    set((state) => ({
      ...state,
      Customer: {
        ...state.Customer,
        [`${fieldName}`]: fieldValue,
      },
    })),
  setAddress: (country, city, postcode, detailedAddress) =>
    set((state) => ({
      ...state,
      Customer: {
        ...state.Customer,
        country: country,
        postcode: postcode,
        city: city,
        detailedAddress: detailedAddress,
      },
    })),
}));
