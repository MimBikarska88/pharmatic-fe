export const ResidenceType = {
  EU: 1,
  NON_EU: 2,
};
export const CurrencyType = {
  EU: 1,
  NON_EU: 2,
};

export const getLicenseStaticInformation = (code) => {
  switch (code) {
    case 1:
      return {
        value: 1,
        label: "Over-The-Counter Type of Medications",
      };
    case 2:
      return {
        value: 2,
        label: "Special Access Scheme",
      };
    case 3:
      return {
        value: 3,
        label: "Clinical Trial Participation",
      };
    case 4:
      return {
        value: 4,
        label: "Special Authorization for Controlled Substances",
      };
  }
};

/*
TODO Make consistent in both BE and FE 

const licenseCodes = {
  manufactoringLicense: 1,
  specialAccessScheme: 2,
  clinicalTrialParticipation: 3,
  specialAuthorizationForControlledSubstances: 4,
};
const labels = {
  manufactoringLicense: "Over-The-Counter Type of Medications",
  specialAccessScheme: "Special Access Scheme",
  clinicalTrialParticipation: "Clinical Trial Participation",
  specialAuthorizationForControlledSubstances:
    "Special Authorization for Controlled Substances",
};
*/
