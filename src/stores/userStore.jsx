import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { roleType } from "../utils/roleTypes";
import {
  areMedicationsTheSame,
  areMedicalRecordsTheSame,
} from "../utils/basicValidation.util";

const customerInitialStore = {
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
  postcode: "",
  street: "",
  medicalRecords: [],
  medications: [],
  generalPractitioner: "",
  latestMedicalCheckup: null,
  allergicSymptoms: "",
  allergicTriggers: "",
};
const vendorInitialStore = {
  primaryPerson: {
    name: "",
    jobTitle: "",
    phone: "",
  },
  secondaryPerson: {
    name: "",
    jobTitle: "",
    phone: "",
  },
  companyName: "",
  email: "",
  manufactoringLicense: null,
  importExportLicense: null,
  specialAccessScheme: null,
  clinicalTrialParticipation: null,
  specialAuthorizationForControlledSubstances: null,
  residence: "",
  EORI: "",
  EUVAT: "",
  FDANumber: "",
  FEINumber: "",
  password: "",
  confirmPassword: "",
  detailedAddress: "",
  country: "",
  city: "",
  postcode: "",
  street: "",
};
export const useUserStore = create(
  immer((set) => ({
    role: roleType.guest,
    Admin: {},
    Customer: { ...customerInitialStore },
    SoleProprietor: {},
    Vendor: { ...vendorInitialStore },

    setCustomerInitialState: () =>
      set((state) => {
        state.Customer = { ...customerInitialStore };
      }),
    setRole: (role) =>
      set((state) => {
        state.role = role;
      }),
    setCustomerUserField: (fieldName, fieldValue) =>
      set((state) => {
        console.log(fieldName);
        console.log(fieldValue);
        state.Customer[`${fieldName}`] = fieldValue;
      }),

    setAddress: (country, city, postcode, detailedAddress) =>
      set((state) => {
        state.Customer.country = country;
        state.Customer.city = city;
        state.Customer.postcode = postcode;
        state.Customer.detailedAddress = detailedAddress;
      }),

    addRowToUserMedicalRecord: (rowData) =>
      set((state) => {
        state.Customer.medicalRecords.push(rowData);
      }),

    addRowToCustomerMedications: (rowData) =>
      set((state) => {
        state.Customer.medications.push(rowData);
      }),

    removeRowsFromCustomerMedications: () =>
      set((state) => {
        state.Customer.medications = state.Customer.medications.filter(
          (row) => !row.delete
        );
      }),

    removeRowsFromCustomerMedicalRecords: () =>
      set((state) => {
        state.Customer.medicalRecords = state.Customer.medicalRecords.filter(
          (row) => !row.delete
        );
      }),

    updateMedicalRecordDeletion: (row, value) =>
      set((state) => {
        const medicalRecors = state.Customer.medicalRecords;
        const index = medicalRecors.findIndex((rec) =>
          areMedicalRecordsTheSame(rec, row)
        );
        if (index !== -1) {
          state.Customer.medicalRecords[index].delete = value;
        }
      }),

    updateMedicationDeletion: (row, value) =>
      set((state) => {
        const medications = state.Customer.medications;
        const index = medications.findIndex((med) =>
          areMedicationsTheSame(med, row)
        );
        if (index !== -1) {
          state.Customer.medications[index].delete = value;
        }
      }),

    setVendorField: (fieldName, fieldValue) =>
      set((state) => {
        state.Vendor[`${fieldName}`] = fieldValue;
      }),
    setPrimaryContact: (fieldName, fieldValue) => {
      set((state) => {
        state.Vendor.primaryPerson[`${fieldName}`] = fieldValue;
      });
    },
    setSecondaryContact: (fieldName, fieldValue) => {
      set((state) => {
        state.Vendor.secondaryPerson[`${fieldName}`] = fieldValue;
      });
    },
    setVendorAddress: (country, city, postcode, detailedAddress) =>
      set((state) => {
        state.Vendor.country = country;
        state.Vendor.city = city;
        state.Vendor.postcode = postcode;
        state.Vendor.detailedAddress = detailedAddress;
      }),
  }))
);
