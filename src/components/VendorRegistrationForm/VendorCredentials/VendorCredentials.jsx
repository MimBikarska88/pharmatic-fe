import PDInput from "../../PDInput/PDInput";
import styles from "./VendorCredentials.module.css";
const VendorCredentials = () => {
  return (
    <>
      <h3 className="m-3 text-center">Credentials</h3>
      <div className="d-flex flex-row justify-content-evenly">
        <div className="flex-column justify-content-center">
          <PDInput
            type="password"
            label="Password"
            className={styles["input-field"]}
          />
          <PDInput
            type="password"
            label="Confirm password"
            className={styles["input-field"]}
          />
        </div>
      </div>
    </>
  );
};
export default VendorCredentials;
