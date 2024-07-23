import { Route, Routes } from "react-router";
import { roleType } from "../../utils/roleTypes";
import { Mode } from "../../utils/mode";

import Register from "../../pages/Register/Register";
import BaseLogin from "../../pages/Login/BaseLogin";
import styles from "./PharmaDirectives.module.css";
import Stock from "../../pages/Stock/Stock";
import DetailedProduct from "../../pages/DetailedProduct/DetailedProduct";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Products from "../../pages/Products.jsx/Products";
const PharmaDirectives = () => {
  return (
    <>
      <div className={`container ${styles.directive}`}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route
            path="/register/customer"
            element={<Register roleType={roleType.customer}></Register>}
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
            <Route
              path="create"
              element={<DetailedProduct mode={Mode.Create} />}
            ></Route>
            <Route
              path="view/:productId"
              element={<DetailedProduct mode={Mode.View} />}
            ></Route>
            <Route
              path="edit/:productId"
              element={<DetailedProduct mode={Mode.Edit} />}
            ></Route>
          </Route>
          <Route path="/products" element={<Products />}></Route>
        </Routes>
      </div>
    </>
  );
};
export default PharmaDirectives;
