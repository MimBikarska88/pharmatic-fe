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
  zipCode: "",
  street: "",
  medicalRecords: [],
  medications: [],
  generalPractitioner: "",
  latestMedicalCheckup: "",
  allergicSymptoms: "",
  allergicTriggers: "",
};
export const useUserStore = create(
  immer((set) => ({
    role: roleType.guest,
    Admin: {},
    Customer: { ...customerInitialStore },
    SoleProprietor: {},
    Organization: {},

    setCustomerInitialState: () =>
      set((state) => {
        state.Customer = { ...customerInitialStore };
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
  }))
);
