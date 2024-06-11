import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { roleType } from "../utils/roleTypes";
import { areMedicationsTheSame } from "../utils/basicValidation.util";

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
    removeRowsFromCustomerMedications: (rows) =>
      set((state) => {
        state.Customer.medications = state.Customer.medications.filter(
          (row) => !row.delete
        );
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
