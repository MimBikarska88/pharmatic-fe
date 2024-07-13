import { create } from "zustand";
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
const vendorInitialStore = {
  primaryContactName: true,
  primaryContactJobTitle: true,
  primaryContactPhone: true,

  secondaryContactName: true,
  secondaryContactJobTitle: true,
  secondaryContactPhone: true,
  companyName: true,
  email: true,

  EORI: true,
  EUVAT: true,
  FDANumber: true,
  FEINumber: true,
  password: true,
  confirmPassword: true,
  detailedAddress: true,
  country: true,
  city: true,
  postcode: true,
};
const productCreateStore = {
  isoCertificate: true,
  chemicalFormula: true,
  appearance: true,
  routeOfAdministration: true,
  indications: true,
  sideEffect: true,
  currencyNonEu: true,
  currencyEu: true,
  pil: true,
  photo: true,
};
export const useValidationStore = create(
  immer((set) => ({
    Register: { ...initialStore },
    RegisterVendor: { ...vendorInitialStore },
    Product: { ...productCreateStore },
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
    setRegisterVendorFieldValidity: (fieldName, fieldValue) =>
      set((state) => {
        state.RegisterVendor[`${fieldName}`] = fieldValue;
      }),
    setProductFieldValidity: (fieldName, fieldValue) =>
      set((state) => {
        state.Product[`${fieldName}`] = fieldValue;
      }),
  }))
);
