import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
import PDInput from "../PDInput/PDInput";
import { useValidationStore } from "../../stores/validationStore";
import { roleType } from "../../utils/roleTypes";
import { isFieldValid } from "./CustomerRegistrationUtils";
import { useErrorStore } from "../../stores/errorStore";

const CustomerRegistrationFormFields = ({ activeTab }) => {
  const Customer = useUserStore((state) => state.Customer);
  const Register = useValidationStore((state) => state.Register);
  const setRole = useUserStore((state) => state.setRole);
  const RegisterErrors = useErrorStore((state) => state.RegisterErrors);
  const setRegisterFieldValidity = useValidationStore(
    (state) => state.setRegisterFieldValidity
  );
  const setCustomerUserField = useUserStore(
    (state) => state.setCustomerUserField
  );

  useEffect(() => {
    setRole(roleType.customer);
  }, []);
  return (
    <div className="container-fluid p-3">
      <form className="form w-100">
        {Number(activeTab) === 0 && (
          <>
            <div className="d-flex flex-direction-row w-50 justify-content-evenly">
              <div className="flex-col pr-3">
                <PDInput
                  className={"p-1"}
                  label={"First Name"}
                  required={true}
                  value={Customer.firstName}
                  isValid={Register.firstName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("firstName", e.target.value);
                    isFieldValid("firstName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={"p-1"}
                  label={"Surname"}
                  required={true}
                  value={Customer.surname}
                  isValid={Register.surname}
                  onChangeFunc={(e) => {
                    setCustomerUserField("surname", e.target.value);
                    isFieldValid("firstName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={"p-1"}
                  label={"Last Name"}
                  required={true}
                  value={Customer.lastName}
                  isValid={Register.lastName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("lastName", e.target.value);
                    isFieldValid("lastName", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={"p-1"}
                  label={"Birth Date"}
                  required={true}
                  type={"date"}
                  isValid={Register.birthDate}
                  value={Customer.birthDate}
                  onChangeFunc={(e) => {
                    setCustomerUserField("birthDate", e.target.value);
                    isFieldValid("birthDate", e.target.value);
                  }}
                ></PDInput>
              </div>
              <div className="flex-col-6">
                <PDInput
                  className={"p-1"}
                  label={"Email"}
                  maxLength={150}
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
                  className={"p-1"}
                  isValid={Register.phoneNumber}
                  label={"Phone Number"}
                  required={true}
                  value={Customer.phoneNumber}
                  onChangeFunc={(e) => {
                    setCustomerUserField("phoneNumber", e.target.value);
                    isFieldValid("phoneNumber", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={"p-1"}
                  label={"Password"}
                  required={true}
                  isValid={Register.password}
                  value={Customer.password}
                  type={"password"}
                  onChangeFunc={(e) => {
                    setCustomerUserField("password", e.target.value);
                    isFieldValid("password", e.target.value);
                  }}
                ></PDInput>
                <PDInput
                  className={"p-1"}
                  isValid={Register.confirmPassword}
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
      </form>
    </div>
  );
};
export default CustomerRegistrationFormFields;
