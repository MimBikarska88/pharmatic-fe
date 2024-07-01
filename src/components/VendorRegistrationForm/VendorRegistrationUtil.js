import { useErrorStore } from "../../stores/errorStore";
import { useUserStore } from "../../stores/userStore";
import { useValidationStore } from "../../stores/validationStore";
import { ResidenceType } from "../../utils/residenceTypes";

export const validatePrimaryContactField = (fieldName, value) => {
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;
  if (fieldName === "name") {
    const isValid = value && value.trim().length > 3 && value.length < 50;
    setRegisterVendorFieldValidity("primaryContactName", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "primaryContactName",
        "Primary Person name must be 3 to 50 symbols."
      );
    } else {
      setVendorRegisterError("primaryContactName", "");
    }
  }
  if (fieldName === "jobTitle") {
    const isValid = value && value.trim().length > 3 && value.length < 50;
    setRegisterVendorFieldValidity("primaryContactJobTitle", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "primaryContactJobTitle",
        "Primary Person'job title must be 3 to 50 symbols."
      );
    } else {
      setVendorRegisterError("primaryContactJobTitle", "");
    }
  }
  if (fieldName === "phone") {
    const regex = /^\+[0-9]{3}\s[0-9]{6,9}$/;
    const isValid = regex.test(value);
    setRegisterVendorFieldValidity("primaryContactPhone", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "primaryContactPhone",
        "Primary Person's phone number is required."
      );
    } else {
      setVendorRegisterError("primaryContactPhone", "");
    }
  }
};
export const validateSecondaryContactField = (fieldName, value) => {
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;
  if (fieldName === "name") {
    // gotta fix
    const isValid = value && value.trim().length > 3 && value.length < 50;
    setRegisterVendorFieldValidity("secondaryContactName", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "secondaryContactName",
        "Secondary Person name must be 3 to 50 symbols."
      );
    } else {
      setVendorRegisterError("secondaryContactName", "");
    }
  }
  if (fieldName === "jobTitle") {
    const isValid = value && value.trim().length > 3 && value.length < 50;
    setRegisterVendorFieldValidity("secondaryContactJobTitle", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "secondaryContactJobTitle",
        "Secondary Person'job title must be 3 to 50 symbols."
      );
    } else {
      setVendorRegisterError("secondaryContactJobTitle", "");
    }
  }
  if (fieldName === "phone") {
    const regex = /^\+[0-9]{3}\s[0-9]{6,9}$/;
    const isValid = regex.test(value);
    setRegisterVendorFieldValidity("secondaryContactPhone", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "secondaryContactPhone",
        "Secondary Person's phone number is required."
      );
    } else {
      setVendorRegisterError("secondaryContactPhone", "");
    }
  }
};

// for Non nested fields

export const validateVendorField = (fieldName, fieldValue) => {
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;
  if (fieldName === "companyName") {
    const isValid =
      fieldValue && fieldValue.length > 3 && fieldValue.length < 100;
    setRegisterVendorFieldValidity("companyName", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "companyName",
        "Company name can be between 3 and 100 symbols."
      );
    } else {
      setVendorRegisterError("companyName", "");
    }
  }
  if (fieldName === "email") {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(fieldValue);
    setRegisterVendorFieldValidity("email", isValid);
    if (!isValid) {
      setVendorRegisterError(
        "email",
        "Email address is required in correct format."
      );
    } else {
      setVendorRegisterError("email", "");
    }
  }
};

export const setVendorLicensesField = (fieldName, fieldValue) => {
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;

  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;

  const setVendorField = useUserStore.getState().setVendorField;
  const EORI = useUserStore.getState().Vendor.EORI;
  const EUVAT = useUserStore.getState().Vendor.EUVAT;
  setVendorField(fieldName, fieldValue);
  if (fieldName === "EORI") {
    const isValid = /^[A-Z]{2}[A-Z0-9]{8,15}$/.test(fieldValue);
    setRegisterVendorFieldValidity(fieldName, isValid);

    if (isValid) {
      setVendorRegisterError(fieldName, "");
      const firstLetters = fieldValue.slice(0, 2);
      if (
        /^[A-Z]{2}[A-Z0-9]{2,12}$/.test(EUVAT) &&
        EUVAT.startsWith(firstLetters)
      ) {
        setRegisterVendorFieldValidity("EUVAT", true);
        setVendorRegisterError("EUVAT", "");
      }
    } else {
      setVendorRegisterError(
        "EORI code format is: [country code] (2 letters) followed by 8 to 15 alphanumeric symbols"
      );
    }
  } else if (fieldName === "EUVAT") {
    const isValid = /^[A-Z]{2}[A-Z0-9]{2,12}$/.test(fieldValue);
    setRegisterVendorFieldValidity(fieldName, isValid);
    if (!isValid) {
      setVendorRegisterError(
        fieldName,
        "EUVAT code format is: [country code] (2 letters) followed by 2 to 12 alphanumeric symbols"
      );
    }
    const EORIfirstLetters = EORI.slice(0, 2);
    console.log(EORI);
    if (fieldValue.startsWith(EORIfirstLetters)) {
      setRegisterVendorFieldValidity(fieldName, true);
      setVendorRegisterError(fieldName, "");
    } else {
      setRegisterVendorFieldValidity(fieldName, false);
      setVendorRegisterError(
        fieldName,
        "EUVAT and EURI must have the same country code."
      );
    }
  } else if (fieldName === "FDANumber") {
    const isValid = /^\d{7,10}$/.test(fieldValue);
    setRegisterVendorFieldValidity(fieldName, isValid);
    if (isValid) {
      setVendorRegisterError(fieldName, "");
    } else {
      setVendorRegisterError(
        fieldName,
        "FDA number consists of 7 to 10 digits"
      );
    }
  } else if (fieldName === "FEINumber") {
    const isValid = /^\d{11}$/.test(fieldValue);
    setRegisterVendorFieldValidity(fieldName, isValid);
    if (isValid) {
      setVendorRegisterError(fieldName, "");
    } else {
      setVendorRegisterError(fieldName, "FEI number consists of 11 digits");
    }
  }
};

export const changeResidence = (fieldValue) => {
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;

  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;

  const setVendorField = useUserStore.getState().setVendorField;
  if (fieldValue === ResidenceType.NON_EU) {
    setVendorField("EORI", "");
    setRegisterVendorFieldValidity("EORI", true);
    setVendorRegisterError("EORI", "");
    setVendorField("EUVAT", "");
    setRegisterVendorFieldValidity("EUVAT", true);
    setVendorRegisterError("EUVAT", "");
  } else if (fieldValue === ResidenceType.EU) {
    setVendorField("FDANumber", "");
    setRegisterVendorFieldValidity("FDANumber", true);
    setVendorRegisterError("FDANumber", "");
    setVendorField("FEINumber", "");
    setRegisterVendorFieldValidity("FEINumber", true);
    setVendorRegisterError("FEINumber", "");
  }
};
