import PDInput from "../../components/PDInput/PDInput";
import styles from "../Login/Login.module.css";
import PDButton from "../../components/PDButton/PDButton";
import pills from "../../static/img/icons/pills.png";
import { useUserStore } from "../../stores/userStore";
import { ResidenceType } from "../../utils/residenceTypes";
import {
  changeEORINumber,
  changeFDANumber,
  changeResidence,
} from "./LoginUtils";
import { useValidationStore } from "../../stores/validationStore";
import { useErrorStore } from "../../stores/errorStore";
import { useNavigate } from "react-router";
import { useModalStore } from "../../stores/modalStore";
import { roleType } from "../../utils/roleTypes";
import useVendorLoginMutation from "../../queries/useVendorLoginMutation/useVendorLoginMutation";

const LoginVendor = () => {
  const Vendor = useUserStore((state) => state.Vendor);
  const setRole = useUserStore.getState().setRole;
  const { FDANumber, EORI } = useValidationStore(
    (state) => state.RegisterVendor
  );
  const VendorRegisterErrors = useErrorStore(
    (state) => state.VendorRegisterErrors
  );
  const setVendorField = useUserStore.getState().setVendorField;
  const { setModal, showModal, hideModal } = useModalStore();
  const navigate = useNavigate();

  const onSuccess = (res) => {
    setVendorField("password", "");
    setVendorField("EORI", "");
    setRole(roleType.vendor);
    window.localStorage.setItem(
      "role",
      JSON.stringify({ type: roleType.vendor })
    );
    if (Vendor.residence === ResidenceType.EU) {
      window.localStorage.setItem(
        "currencyType",
        JSON.stringify({ type: ResidenceType.EU })
      );
    }
    if (Vendor.residence === ResidenceType.NON_EU) {
      window.localStorage.setItem(
        "currencyType",
        JSON.stringify({ type: ResidenceType.NON_EU })
      );
    }
    window.localStorage.setItem(
      "residence",
      JSON.stringify({ type: Vendor.residence })
    );
  };
  const onCloseModal = () => {
    hideModal();
    setModal({
      modalTitle: "",
      modalText: "",
    });
  };

  const onError = (err) => {
    setModal({
      modalTitle: "Error",
      modalText: err.response.data?.message,
      showCancel: false,
      onClose: onCloseModal,
    });
    showModal();
  };
  const vendorLoginMutation = useVendorLoginMutation(onError, onSuccess);

  const login = () => {
    const data = {
      FDANumber: Vendor.FDANumber,
      EORI: Vendor.EORI,
      residence: Vendor.residence,
      password: Vendor.password,
    };
    vendorLoginMutation.mutate(data);
  };
  return (
    <>
      <div className="d-flex flex-collumn justify-content-center">
        <div className="flex-collumn">
          <h2 className="text-center p-4 m-3">
            <strong>Welcome</strong>
          </h2>
          <div className="flex-row">
            <img
              src={pills}
              alt="healthcare"
              className="mx-auto d-block mb-3"
            ></img>
          </div>

          <div className="d-flex flex-row">
            <PDInput
              label={"EU"}
              type="radio"
              name="residence"
              style={{ marginRight: "3rem" }}
              onChangeFunc={(e) => {
                setVendorField("residence", ResidenceType.EU);
                changeResidence(ResidenceType.EU);
              }}
            ></PDInput>
            <PDInput
              label={"NON EU"}
              name="residence"
              type="radio"
              onChangeFunc={(e) => {
                setVendorField("residence", ResidenceType.NON_EU);
                changeResidence(ResidenceType.NON_EU);
              }}
            ></PDInput>
          </div>
          <div className="flex-row">
            <PDInput
              label={"Password"}
              type="password"
              value={Vendor.password}
              onChangeFunc={(e) => setVendorField("password", e.target.value)}
              className={`${styles["input-field"]}`}
              required={true}
              maxLength={50}
            ></PDInput>
          </div>
          <div className="flex-row">
            {Vendor.residence === ResidenceType.EU && (
              <PDInput
                label={"EORI Number"}
                errorMessage={VendorRegisterErrors.EORI}
                type="text"
                className={`${styles["input-field"]}`}
                disabled={Vendor.residence !== ResidenceType.EU}
                isValid={EORI}
                value={Vendor.EORI}
                maxLength={50}
                onChangeFunc={(e) => {
                  setVendorField("EORI", e.target.value);
                  changeEORINumber(e.target.value);
                }}
              ></PDInput>
            )}
          </div>
          <div className="flex-row">
            {Vendor.residence === ResidenceType.NON_EU && (
              <PDInput
                label={"FDA Registration Number"}
                type="text"
                isValid={FDANumber}
                errorMessage={VendorRegisterErrors.FDANumber}
                value={Vendor.FDANumber}
                className={`${styles["input-field"]}`}
                disabled={Vendor.residence !== ResidenceType.NON_EU}
                maxLength={50}
                onChangeFunc={(e) => {
                  setVendorField("FDANumber", e.target.value);
                  changeFDANumber(e.target.value);
                }}
              ></PDInput>
            )}
          </div>
          <div className="flex-row text-center">
            <a className={`${styles["link"]}`} href="#">
              Forgot password
            </a>
          </div>
          <div className="flex-row text-center mt-5">
            <PDButton
              value={"Log In"}
              color={"purple"}
              onClick={login}
              className={"p-2 m-2"}
              style={{ width: "120px" }}
            />
            <PDButton
              value={"Sign up now"}
              style={{ width: "120px" }}
              color={"green"}
              className={"p-2"}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default LoginVendor;
