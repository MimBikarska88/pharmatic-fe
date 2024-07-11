import Login from "./Login";
import LoginVendor from "./LoginVendor";
import { roleType as role } from "../../utils/roleTypes";
import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import PDButton from "../../components/PDButton/PDButton";
import { useNavigate } from "react-router";
const BaseLogin = ({ roleType }) => {
  const { resetVendorState, resetCustomerState } = useUserStore.getState();
  const navigate = useNavigate();
  useEffect(() => {
    resetCustomerState();
    resetVendorState();
  }, []);
  console.log(roleType);
  return (
    <>
      {!roleType && (
        <div className="d-flex flex-row justify-content-center">
          <PDButton
            color="purple"
            value="Login as Customer"
            className={"m-5 pt-5"}
            onClick={() => navigate("/login/customer")}
          ></PDButton>
          <PDButton
            color="green"
            value="Login as Vendor"
            className={"m-5 pt-5"}
            onClick={() => navigate("/login/vendor")}
          ></PDButton>{" "}
        </div>
      )}
      {role.customer === roleType && <Login />}
      {role.vendor === roleType && <LoginVendor />}
    </>
  );
};
export default BaseLogin;
