import { useState } from "react";
import PDInput from "../../components/PDInput/PDInput";
import styles from "../Login/Login.module.css";
import PDButton from "../../components/PDButton/PDButton";
import healthy from "../../static/img/icons/healthy.png";
import useLoginMutation from "../../queries/LoginMutation/useLoginMutation";
import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { useModalStore } from "../../stores/modalStore";
import { roleType } from "../../utils/roleTypes";
import { CurrencyType } from "../../utils/residenceTypes";
const Login = () => {
  const navigate = useNavigate();
  const { setRole, setCurrencyEuro } = useUserStore.getState();
  const [credentials, setCredentials] = useState({
    password: "",
    email: "",
  });
  // must add validation and link for sign up and forgotten password
  // forgotten password requires email sender service implementation

  const { setModal, showModal, hideModal } = useModalStore();
  const onCloseModal = () => {
    hideModal();
    setModal({
      modalTitle: "",
      modalText: "",
    });
  };

  const onSuccess = (res) => {
    setRole(roleType.customer);
    setCurrencyEuro();
    window.localStorage.setItem(
      "role",
      JSON.stringify({ type: roleType.customer })
    );
    navigate("/");
  };
  const onError = (err) => {
    setModal({
      modalTitle: "Error",
      modalText: err.response.data?.message || "Login went wrong!",
      showCancel: false,
      onClose: onCloseModal,
    });
    showModal();
  };
  const loginMutation = useLoginMutation(onError, onSuccess);
  const onLoginClick = (e) => {
    loginMutation.mutate(credentials);
  };
  return (
    <div className="d-flex flex-collumn justify-content-center">
      <div className="flex-collumn">
        <h2 className="text-center p-4 m-3">
          <strong>Welcome</strong>
        </h2>
        <div className="flex-row">
          <img
            src={healthy}
            alt="healthcare"
            className="mx-auto d-block mb-3"
          ></img>
        </div>

        <div className="flex-row">
          <PDInput
            label={"Email"}
            type="email"
            className={`${styles["input-field"]}`}
            required={true}
            value={credentials.email}
            maxLength={50}
            onChangeFunc={(e) => {
              setCredentials((state) => ({ ...state, email: e.target.value }));
            }}
          ></PDInput>
        </div>
        <div className="flex-row">
          <PDInput
            label={"Password"}
            type="password"
            className={`${styles["input-field"]}`}
            required={true}
            value={credentials.password}
            maxLength={50}
            onChangeFunc={(e) => {
              setCredentials((state) => ({
                ...state,
                password: e.target.value,
              }));
            }}
          ></PDInput>
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
            className={"p-2 m-2"}
            style={{ width: "120px" }}
            onClick={onLoginClick}
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
  );
};
export default Login;
