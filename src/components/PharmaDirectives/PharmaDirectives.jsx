import { Route, Routes } from "react-router";
import { roleType } from "../../utils/roleTypes";

import Register from "../../pages/Register/Register";
import BaseLogin from "../../pages/Login/BaseLogin";
import styles from "./PharmaDirectives.module.css";
import Stock from "../../pages/Stock/Stock";
import CreateProduct from "../../pages/CreateProduct/CreateProduct";
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
          <Route path="/login" element={<BaseLogin />}></Route>
          <Route
            path="/login/customer"
            element={<BaseLogin roleType={roleType.customer} />}
          ></Route>
          <Route
            path="/login/vendor"
            element={<BaseLogin roleType={roleType.vendor} />}
          ></Route>
          <Route path="/stock">
            <Route path="" element={<Stock />}></Route>
            <Route path="create" element={<CreateProduct />}></Route>
          </Route>
        </Routes>
      </div>
    </>
  );
};
export default PharmaDirectives;
