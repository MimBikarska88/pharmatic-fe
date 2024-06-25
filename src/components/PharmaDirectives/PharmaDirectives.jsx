import styles from "./PharmaDirectives.module.css";
import { Route, Routes } from "react-router";
import Register from "../../pages/Register/Register";
import Login from "../../pages/Login/Login";
import { roleType } from "../../utils/roleTypes";
const PharmaDirectives = () => {
  return (
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
        <Route path="login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};
export default PharmaDirectives;
