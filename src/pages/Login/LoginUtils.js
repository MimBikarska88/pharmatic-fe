import { useErrorStore } from "../../stores/errorStore";
import { useUserStore } from "../../stores/userStore";
import { useValidationStore } from "../../stores/validationStore";
import { ResidenceType } from "../../utils/residenceTypes";

export const isEoriValid = (value) => {
  return /^[A-Z]{2}[A-Z0-9]{8,15}$/.test(value);
};
export const isFdaNumberValid = (value) => {
  return /^\d{7,10}$/.test(value);
};
export const changeFDANumber = (value) => {
  const setVendorField = useUserStore.getState().setVendorField;
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;

  if (!isFdaNumberValid(value)) {
    setRegisterVendorFieldValidity("FDANumber", false);
    setVendorRegisterError(
      "FDANumber",
      "FDA number consists of 7 to 10 digits"
    );
  } else {
    setRegisterVendorFieldValidity("FDANumber", true);
    setVendorRegisterError("FDANumber", "");
  }
};
export const changeEORINumber = (value) => {
  const setVendorField = useUserStore.getState().setVendorField;
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;

  if (!isEoriValid(value)) {
    setRegisterVendorFieldValidity("EORI", false);
    setVendorRegisterError(
      "EORI",
      "EORI required: [country code] and 8 to 15 alphanumeric symbols"
    );
  } else {
    setRegisterVendorFieldValidity("EORI", true);
    setVendorRegisterError("EORI", "");
  }
};
export const changeResidence = (type) => {
  const setVendorField = useUserStore.getState().setVendorField;
  const setRegisterVendorFieldValidity =
    useValidationStore.getState().setRegisterVendorFieldValidity;
  const setVendorRegisterError =
    useErrorStore.getState().setVendorRegisterError;
  if (type === ResidenceType.EU) {
    setVendorField("FDANumber", "");
    setVendorRegisterError("FDANumber", "");
    setRegisterVendorFieldValidity("FDANumber", true);
  }
  if (type === ResidenceType.NON_EU) {
    setVendorField("EORI", "");
    setVendorRegisterError("EORI", "");
    setRegisterVendorFieldValidity("EORI", true);
  }
};
