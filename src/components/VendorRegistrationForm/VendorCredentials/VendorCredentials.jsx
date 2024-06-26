import PDInput from "../../PDInput/PDInput";
import styles from "./VendorCredentials.module.css";

import { useUserStore } from "../../../stores/userStore";
const VendorCredentials = () => {
  const setVendorField = useUserStore.getState().setVendorField;
  const Vendor = useUserStore((state) => state.Vendor);

  return (
    <>
      <h3 className="m-3 text-center">Credentials</h3>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="flex-column justify-content-center">
          <PDInput
            type="password"
            label="Password"
            value={Vendor.password}
            onChange={(e) => setVendorField("password", e.target.value)}
            className={styles["input-field"]}
          />
          <PDInput
            type="password"
            value={Vendor.confirmPassword}
            onChange={(e) => setVendorField("confirmPassword", e.target.value)}
            label="Confirm password"
            className={styles["input-field"]}
          />
        </div>
      </div>
    </>
  );
};
export default VendorCredentials;
