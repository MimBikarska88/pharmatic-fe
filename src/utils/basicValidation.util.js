export const isEmpty = (obj) => {
  return obj && obj !== undefined && Object.keys(obj).length !== 0;
};

export const isEmptyString = (str) => {
  return !str || str.length === 0 || str.trim() === "";
};
export const areMedicationsTheSame = (med1, med2) => {
  return (
    med1.medicationName === med2.medicationName &&
    med1.duration === med2.duration &&
    med1.frequency === med2.frequency &&
    med1.indication === med2.indication &&
    med1.roa === med2.roa
  );
};
export const areMedicalRecordsTheSame = (rec1, rec2) => {
  return (
    rec1.medicalFacility === rec2.medicalFacility &&
    rec1.medicalInterventionType === rec2.medicalInterventionType &&
    rec1.arrivalDate === rec2.arrivalDate &&
    rec1.leaveDate === rec2.leaveDate
  );
};
