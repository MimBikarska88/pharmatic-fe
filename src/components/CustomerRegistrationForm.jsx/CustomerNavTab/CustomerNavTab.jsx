import PDButton from "../../PDButton/PDButton";
import styles from "./CustomerNavTab.module.css";
import { useRegisterCustomerMutation } from "../../../queries/RegisterCustomerMutation/useRegisterCustomerMutation";
import { useUserStore } from "../../../stores/userStore";
import { useErrorStore } from "../../../stores/errorStore";
import { useValidationStore } from "../../../stores/validationStore";
import { isEmptyString } from "../../../utils/basicValidation.util";
import { roleType } from "../../../utils/roleTypes";
import { json, useNavigate } from "react-router";
const CustomerNavTab = ({ activeTab, setActiveTab }) => {
  const Customer = useUserStore((state) => state.Customer);
  const setRegisterError = useErrorStore((state) => state.setRegisterError);
  const setRole = useUserStore((state) => state.setRole);
  const setRegisterFieldValidity = useValidationStore(
    (state) => state.setRegisterFieldValidity
  );
  const navigate = useNavigate();

  const onError = (error) => {
    const { errors, tabIndex } = error.response?.data;
    setActiveTab(tabIndex);
    Object.entries(errors).forEach((entry) => {
      if (!isEmptyString(entry[1])) {
        setRegisterError(entry[0], entry[1]);
        setRegisterFieldValidity(entry[0], false);
        if (entry[0] === "password") {
          setRegisterFieldValidity("confirmPassword", false);
        }
      }
    });
  };
  const onSuccess = (res) => {
    window.localStorage.setItem("role", JSON.stringify(roleType.customer));
    setRole(roleType.customer);
    navigate("/");
  };
  const registerCustomerMutation = useRegisterCustomerMutation(
    onError,
    onSuccess
  );
  const submitRegisterForm = (e) => {
    const json = JSON.stringify(Customer);
    const blob = new Blob([json], {
      type: "application/json",
    });
    const formData = new FormData();
    formData.append("latestMedicalCheckup", Customer.latestMedicalCheckup);
    formData.append("customer", json);
    registerCustomerMutation.mutate(formData);
  };

  return (
    <>
      <ul
        className={`nav nav-tabs m-3 d-inline-flex w-75 ${styles.tabs}`}
        role="tablist"
      >
        {[
          "Contact",
          "Address and Occupation",
          "Past Medical History",
          "Medications",
          "Allergies",
        ].map((item, _index) => (
          <li key={_index} className="nav-item link-dark" role="presentation">
            <button
              onClick={() => setActiveTab(_index)}
              className={
                _index === Number(activeTab)
                  ? "nav-link active selected-tab"
                  : "nav-link "
              }
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <PDButton value="submit" color={"green"} onClick={submitRegisterForm} />
    </>
  );
};
export default CustomerNavTab;
