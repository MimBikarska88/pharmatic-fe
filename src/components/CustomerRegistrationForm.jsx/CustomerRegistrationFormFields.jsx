import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import PDInput from "../PDInput/PDInput";
import { useValidationStore } from "../../stores/validationStore";
import { roleType } from "../../utils/roleTypes";
import { isFieldValid } from "./CustomerRegistrationUtils";
import { useErrorStore } from "../../stores/errorStore";
import CustomerAddress from "./CustomerFormComponents/CustomerAddress";
import styles from "./CustomerRegistrationForm.module.css";
const CustomerRegistrationFormFields = ({ activeTab }) => {
  const Customer = useUserStore((state) => state.Customer);
  const Register = useValidationStore((state) => state.Register);
  const setRole = useUserStore((state) => state.setRole);
  const RegisterErrors = useErrorStore((state) => state.RegisterErrors);
  const setCustomerUserField = useUserStore(
    (state) => state.setCustomerUserField
  );

  useEffect(() => {
    setRole(roleType.customer);
  }, []);
  return (
    <div className="container-fluid p-3">
      <div className="form w-100">
        {Number(activeTab) === 0 && (
          <>
            <div className="d-flex flex-direction-row w-50 justify-content-evenly">
              <div className="flex-col">
                <PDInput
                  label={"First Name"}
                  type="text"
                  className={`${styles["input-field"]}`}
                  errorMessage={RegisterErrors.firstName}
                  required={true}
                  value={Customer.firstName}
                  isValid={Register.firstName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("firstName", e.target.value);
                    isFieldValid("firstName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  label={"Surname"}
                  errorMessage={RegisterErrors.surname}
                  className={`${styles["input-field"]}`}
                  required={true}
                  value={Customer.surname}
                  type="text"
                  isValid={Register.surname}
                  onChangeFunc={(e) => {
                    setCustomerUserField("surname", e.target.value);
                    isFieldValid("firstName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  label={"Last Name"}
                  type={"text"}
                  errorMessage={RegisterErrors.lastName}
                  required={true}
                  className={`${styles["input-field"]}`}
                  value={Customer.lastName}
                  isValid={Register.lastName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("lastName", e.target.value);
                    isFieldValid("lastName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  label={"Birth Date"}
                  required={true}
                  errorMessage={RegisterErrors.birthDate}
                  type={"date"}
                  className={`${styles["input-field"]}`}
                  isValid={Register.birthDate}
                  value={Customer.birthDate}
                  onChangeFunc={(e) => {
                    setCustomerUserField("birthDate", e.target.value);
                    isFieldValid("birthDate", e.target.value);
                  }}
                ></PDInput>
              </div>
              <div className="flex-col">
                <PDInput
                  label={"Email"}
                  maxLength={150}
                  className={`${styles["input-field"]}`}
                  errorMessage={RegisterErrors.email}
                  isValid={Register.email}
                  required={true}
                  type={"email"}
                  value={Customer.email}
                  onChangeFunc={(e) => {
                    setCustomerUserField("email", e.target.value);
                    isFieldValid("email", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={`${styles["input-field"]}`}
                  errorMessage={RegisterErrors.phoneNumber}
                  isValid={Register.phoneNumber}
                  label={"Phone Number"}
                  type="text"
                  required={true}
                  value={Customer.phoneNumber}
                  onChangeFunc={(e) => {
                    setCustomerUserField("phoneNumber", e.target.value);
                    isFieldValid("phoneNumber", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  label={"Password"}
                  required={true}
                  errorMessage={RegisterErrors.password}
                  className={`${styles["input-field"]}`}
                  isValid={Register.password}
                  value={Customer.password}
                  type={"password"}
                  onChangeFunc={(e) => {
                    setCustomerUserField("password", e.target.value);
                    isFieldValid("password", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  isValid={Register.confirmPassword}
                  className={`${styles["input-field"]}`}
                  errorMessage={RegisterErrors.confirmPassword}
                  label={"Confirm password"}
                  value={Customer.confirmPassword}
                  type={"password"}
                  required={true}
                  onChangeFunc={(e) => {
                    setCustomerUserField("password", e.target.value);
                    isFieldValid("password", e.target.value);
                  }}
                ></PDInput>
              </div>
            </div>
          </>
        )}
        {Number(activeTab) === 1 && (
          <>
            <CustomerAddress />
          </>
        )}
      </div>
    </div>
  );
};
export default CustomerRegistrationFormFields;
