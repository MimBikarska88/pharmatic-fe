import { useErrorStore } from "../../stores/errorStore";
import { useValidationStore } from "../../stores/validationStore";

export const productPlaceholders = {
  isoCertificate: "e.g., ISO 9001:2015",
  chemicalFormula: "e.g., C8H9NO2 for Acetaminophen",
  appearance: "e.g., White crystalline powder",
  routeOfAdministration: "e.g., Oral, Intravenous",
  indications: "e.g., Used for relief of fever and mild pain",
  sideEffect: "e.g., Nausea, dizziness, rash",
  currencyNonEu: "$0.00",
  currencyEu: "0.00€",
};
export const validateProductFields = (fieldName, fieldValue) => {
  const setProductFieldValidity =
    useValidationStore.getState().setProductFieldValidity;
  const setProductError = useErrorStore.getState().setProductError;

  if (fieldName === "isoCertificate") {
    if (!fieldValue || fieldValue.trim() === "") {
      setProductError(`${fieldName}`, "ISO Certificate number required");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      const isoRegex = /^ISO\s?\d{4}(:\d{4})?$/;
      if (!isoRegex.test(fieldValue)) {
        /**
         * Examples of Matches:
            ISO9001
            ISO 9001
            ISO9001:2015
            ISO 14001:2015
            Usage in JavaScript:
         */
        setProductError(`${fieldName}`, "ISO Certificate format is incorrect");
        setProductFieldValidity(`${fieldName}`, false);
      } else {
        setProductError(`${fieldName}`, "");
        setProductFieldValidity(`${fieldName}`, true);
      }
    }
  }

  if (fieldName === "chemicalFormula") {
    if (!fieldValue || fieldName.trim() === "") {
      setProductError(`${fieldName}`, "Chemical Formula is required field.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      if (!/^([A-Z][a-z]?\d*)+$/.test(fieldValue)) {
        setProductError(
          `${fieldName}`,
          "Chemical Formula can have letters and digits."
        );
        setProductFieldValidity(`${fieldName}`, false);
      } else {
        setProductError(`${fieldName}`, "");
        setProductFieldValidity(`${fieldName}`, true);
      }
    }
  }
  if (fieldName === "medicationName") {
    if (!fieldValue || fieldName.trim() === "") {
      setProductError(`${fieldName}`, "Name is required field.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
  if (fieldName === "appearance") {
    if (!fieldValue || fieldName.trim() === "") {
      setProductError(`${fieldName}`, "Appearance is required field.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
  if (fieldName === "routeOfAdministration") {
    if (!fieldValue) {
      setProductError(
        `${fieldName}`,
        "Route Of Administration is required field."
      );
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
  if (fieldName === "sideEffects") {
    if (!fieldValue || fieldName.trim() === "") {
      setProductError(`${fieldName}`, "Side Effects information is required.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }

  if (fieldName === "indications") {
    if (!fieldValue || fieldName.trim() === "") {
      setProductError(`${fieldName}`, "Indications for usage are required.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
  if (fieldName === "classification") {
    if (!fieldValue) {
      setProductError(`${fieldName}`, "Classification is required field.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
  if (fieldName === "licenseType") {
    if (!fieldValue) {
      setProductError(`${fieldName}`, "License Type is required field.");
      setProductFieldValidity(`${fieldName}`, false);
    } else {
      setProductError(`${fieldName}`, "");
      setProductFieldValidity(`${fieldName}`, true);
    }
  }
};
