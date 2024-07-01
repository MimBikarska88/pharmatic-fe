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
const vendorInitialStore = {
  primaryContactName: "",
  primaryContactJobTiltle: "",
  primaryContactPhone: "",

  secondaryContactName: "",
  secondaryContactJobTiltle: "",
  secondaryContactPhone: "",

  vendorName: "",
  vendorEmail: "",

  EORI: "",
  EUVAT: "",
  FDANumber: "",
  FEINumber: "",
  password: "",
  confirmPassword: "",
  detailedAddress: "",
};

export const useErrorStore = create(
  immer((set) => ({
    RegisterErrors: { ...initialStore },
    VendorRegisterErrors: { ...vendorInitialStore },

    setRegisterError: (fieldName, fieldValue) =>
      set((state) => {
        state.RegisterErrors[`${fieldName}`] = fieldValue;
      }),
    setVendorRegisterError: (fieldName, fieldValue) =>
      set((state) => {
        state.VendorRegisterErrors[`${fieldName}`] = fieldValue;
      }),
  }))
);
