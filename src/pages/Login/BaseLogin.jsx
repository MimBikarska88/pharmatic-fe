import Login from "./Login";
import LoginVendor from "./LoginVendor";
import { roleType as role } from "../../utils/roleTypes";
import { useEffect } from "react";
import { useUserStore } from "../../stores/userStore";
const BaseLogin = ({ roleType }) => {
  const { resetVendorState, resetCustomerState } = useUserStore.getState();
  useEffect(() => {
    resetCustomerState();
    resetVendorState();
  }, []);
  return (
    <>
      {role.customer === roleType && <Login />}
      {role.vendor === roleType && <LoginVendor />}
    </>
  );
};
export default BaseLogin;
