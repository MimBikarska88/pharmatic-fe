import { Route, Routes } from "react-router";
import { roleType } from "../../utils/roleTypes";

import Register from "../../pages/Register/Register";
import BaseLogin from "../../pages/Login/BaseLogin";
import styles from "./PharmaDirectives.module.css";
const PharmaDirectives = () => {
  return (
    <>
      <div className={`container ${styles.directive}`}>
        <Routes>
          <Route path="/" element={<h3>Home</h3>}></Route>
          <Route
            path="/register/customer"
            element={<Register roleType={roleType.customer}></Register>}
          ></Route>
          <Route
            path="/register/admin"
            element={<Register roleType={roleType.soleProprietor}></Register>}
          ></Route>
          <Route
            path="/register/vendor"
            element={<Register roleType={roleType.vendor}></Register>}
          ></Route>
          <Route
            path="/login/customer"
            element={<BaseLogin roleType={roleType.customer} />}
          ></Route>
          <Route
            path="/login/vendor"
            element={<BaseLogin roleType={roleType.vendor} />}
          ></Route>
        </Routes>
      </div>
    </>
  );
};
export default PharmaDirectives;
