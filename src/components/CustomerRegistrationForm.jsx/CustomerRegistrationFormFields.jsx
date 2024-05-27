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
                  label={"First Name"}
                  required={true}
                  value={Customer.firstName}
                  isValid={Register.firstName}
                  errorMessage={RegisterErrors.firstName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("firstName", e.target.value);
                    setRegisterFieldValidity(
                      "firstName",
                      isFieldValid("firstName", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  label={"Surname"}
                  required={true}
                  value={Customer.surname}
                  isValid={Register.surname}
                  onChangeFunc={(e) => {
                    setCustomerUserField("surname", e.target.value);
                    setRegisterFieldValidity(
                      "surname",
                      isFieldValid("firstName", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  label={"Last Name"}
                  required={true}
                  value={Customer.lastName}
                  isValid={Register.lastName}
                  onChangeFunc={(e) => {
                    setCustomerUserField("lastName", e.target.value);
                    setRegisterFieldValidity(
                      "lastName",
                      isFieldValid("lastName", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  label={"Birth Date"}
                  required={true}
                  type={"date"}
                  isValid={Register.birthDate}
                  value={Customer.birthDate}
                  onChangeFunc={(e) => {
                    setCustomerUserField("birthDate", e.target.value);
                    setRegisterFieldValidity(
                      "birthDate",
                      isFieldValid("birthDate", e.target.value)
                    );
                  }}
                ></PDInput>
              </div>
              <div className="flex-col">
                <PDInput
                  label={"Email"}
                  maxLength={150}
                  isValid={Register.email}
                  required={true}
                  type={"email"}
                  value={Customer.email}
                  onChangeFunc={(e) => {
                    setCustomerUserField("email", e.target.value);
                    setRegisterFieldValidity(
                      "email",
                      isFieldValid("email", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  isValid={Register.phoneNumber}
                  label={"Phone Number"}
                  required={true}
                  value={Customer.phoneNumber}
                  onChangeFunc={(e) => {
                    setCustomerUserField("phoneNumber", e.target.value);
                    setRegisterFieldValidity(
                      "phoneNumber",
                      isFieldValid("phoneNumber", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  label={"Password"}
                  required={true}
                  isValid={Register.password}
                  value={Customer.password}
                  type={"password"}
                  onChangeFunc={(e) => {
                    setCustomerUserField("password", e.target.value);
                    setRegisterFieldValidity(
                      "password",
                      isFieldValid("password", e.target.value)
                    );
                  }}
                ></PDInput>
                <PDInput
                  isValid={Register.confirmPassword}
                  label={"Confirm password"}
                  value={Customer.confirmPassword}
                  type={"password"}
                  required={true}
                  onChangeFunc={(e) => {
                    setCustomerUserField("password", e.target.value);
                    setRegisterFieldValidity(
                      "password",
                      isFieldValid("password", e.target.value)
                    );
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
