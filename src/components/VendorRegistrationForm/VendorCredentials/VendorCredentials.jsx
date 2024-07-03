import PDInput from "../../PDInput/PDInput";
import styles from "./VendorCredentials.module.css";

import { useUserStore } from "../../../stores/userStore";
import { useErrorStore } from "../../../stores/errorStore";
import { useValidationStore } from "../../../stores/validationStore";
import {
  validateConfirmPassword,
  validatePassword,
} from "../VendorRegistrationUtil";
const VendorCredentials = () => {
  const setVendorField = useUserStore.getState().setVendorField;
  const Vendor = useUserStore((state) => state.Vendor);
  const VendorRegisterErrors = useErrorStore(
    (state) => state.VendorRegisterErrors
  );
  const { password, confirmPassword } = useValidationStore(
    (state) => state.RegisterVendor
  );

  const passwordChangeHandler = (e) => {
    setVendorField("password", e.target.value);
    validatePassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setVendorField("confirmPassword", e.target.value);
    validateConfirmPassword(e.target.value);
  };
  return (
    <>
      <h3 className="m-3 text-center">Credentials</h3>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="flex-column justify-content-center">
          <PDInput
            type="password"
            label="Password"
            value={Vendor.password}
            isValid={password}
            errorMessage={VendorRegisterErrors.password}
            onChange={passwordChangeHandler}
            className={styles["input-field"]}
          />
          <PDInput
            type="password"
            value={Vendor.confirmPassword}
            onChange={confirmPasswordChangeHandler}
            label="Confirm password"
            errorMessage={VendorRegisterErrors.confirmPassword}
            isValid={confirmPassword}
            className={styles["input-field"]}
          />
        </div>
      </div>
    </>
  );
};
export default VendorCredentials;
