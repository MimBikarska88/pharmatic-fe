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
  primaryContactJobTitle: "",
  primaryContactPhone: "",

  secondaryContactName: "",
  secondaryContactJobTitle: "",
  secondaryContactPhone: "",

  companyName: "",
  email: "",

  manufacturingLicense: "",
  EORI: "",
  EUVAT: "",
  FDANumber: "",
  FEINumber: "",
  password: "",
  confirmPassword: "",
  detailedAddress: "",
};

const ProductErrorStore = {
  isoCertificate: "",
  chemicalFormula: "",
  appearance: "",
  routeOfAdministration: "",
  indications: "",
  sideEffect: "",
  currencyNonEu: "",
  currencyEu: "",
  pil: "",
};
export const useErrorStore = create(
  immer((set) => ({
    RegisterErrors: { ...initialStore },
    VendorRegisterErrors: { ...vendorInitialStore },
    ProductErrors: { ...ProductErrorStore },
    setRegisterError: (fieldName, fieldValue) =>
      set((state) => {
        state.RegisterErrors[`${fieldName}`] = fieldValue;
      }),
    setVendorRegisterError: (fieldName, fieldValue) =>
      set((state) => {
        state.VendorRegisterErrors[`${fieldName}`] = fieldValue;
      }),
    setProductError: (fieldName, fieldValue) =>
      set((state) => {
        state.ProductErrors[`${fieldName}`] = fieldValue;
      }),
  }))
);
