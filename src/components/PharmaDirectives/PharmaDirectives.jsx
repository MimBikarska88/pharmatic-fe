import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { roleType } from "../../utils/roleTypes";
import { Mode } from "../../utils/mode";
import AuthorizedRoute from "./AuthorizedRoute";
import Register from "../../pages/Register/Register";
import BaseLogin from "../../pages/Login/BaseLogin";
import styles from "./PharmaDirectives.module.css";
import Stock from "../../pages/Stock/Stock";
import DetailedProduct from "../../pages/DetailedProduct/DetailedProduct";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Products from "../../pages/Products.jsx/Products";

import { useUserStore } from "../../stores/userStore";
import Cart from "../../pages/Cart/Cart";
import CustomerOrders from "../../pages/CustomerOrders/CustomerOrders";
const PharmaDirectives = () => {
  const role = useUserStore((state) => state.role);

  return (
    <>
      <div className={`container ${styles.directive}`}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
          <Route
            path="/unauthorized"
            element={
              <ErrorPage
                statusCode={401}
                message={"You are not authorized to visit this page"}
              />
            }
          ></Route>
          <Route
            path="/register"
            element={
              <AuthorizedRoute
                component={<Register />}
                role={role}
                allowedRoles={[roleType.guest]}
                navigate={"/"}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/register/vendor"
            element={
              <AuthorizedRoute
                component={<Register roleType={roleType.vendor} />}
                role={role}
                allowedRoles={[roleType.guest]}
                navigate={"/"}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/register/customer"
            element={
              <AuthorizedRoute
                component={<Register roleType={roleType.customer} />}
                role={role}
                allowedRoles={[roleType.guest]}
                navigate={"/"}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <AuthorizedRoute
                component={<BaseLogin />}
                role={role}
                allowedRoles={[roleType.guest]}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/login/vendor"
            element={
              <AuthorizedRoute
                component={<BaseLogin roleType={roleType.vendor} />}
                role={role}
                allowedRoles={[roleType.guest]}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/login/customer"
            element={
              <AuthorizedRoute
                component={<BaseLogin roleType={roleType.customer} />}
                role={role}
                allowedRoles={[roleType.guest]}
              ></AuthorizedRoute>
            }
          ></Route>
          <Route path="/stock">
            {role === roleType.customer && (
              <Route path="" element={<Products />}></Route>
            )}
            {role === roleType.vendor && (
              <Route path="" element={<Stock />}></Route>
            )}
            <Route
              path="create"
              element={
                <AuthorizedRoute
                  role={role}
                  navigate={"/"}
                  allowedRoles={[roleType.vendor]}
                  component={<DetailedProduct mode={Mode.Create} />}
                />
              }
            />
            <Route
              path="edit/:productId"
              element={
                <AuthorizedRoute
                  role={role}
                  allowedRoles={[roleType.vendor]}
                  navigate={"/products"}
                  component={<DetailedProduct mode={Mode.Edit} />}
                />
              }
            ></Route>
            <Route
              path="view/:productId"
              element={
                <AuthorizedRoute
                  role={role}
                  allowedRoles={[roleType.customer, roleType.vendor]}
                  navigate={"/"}
                  component={<DetailedProduct mode={Mode.View} />}
                />
              }
            ></Route>
          </Route>
          <Route path="/orders">
            <Route
              path="customer"
              element={
                <AuthorizedRoute
                  component={<CustomerOrders />}
                  role={role}
                  allowedRoles={[roleType.customer]}
                ></AuthorizedRoute>
              }
            ></Route>
          </Route>
          <Route
            path="/cart"
            element={
              <AuthorizedRoute
                role={role}
                allowedRoles={roleType.customer}
                component={<Cart />}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
  /*
  return (
    <>
      <div className={`container ${styles.directive}`}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/error" element={<ErrorPage />}></Route>
          {role === roleType.guest ? (
            <>
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
            </>
          ) : (
            <Navigate to={"/unauthorized"} />
          )}
          {authorizedRoles.includes(role) ? (
            <>
              <Route path="/stock">
                {role === roleType.customer && (
                  <Route path="" element={<Products />}></Route>
                )}
                {role === roleType.vendor && (
                  <>
                    <Route path="" element={<Stock />}></Route>
                    <Route
                      path="create"
                      element={<DetailedProduct mode={Mode.Create} />}
                    ></Route>
                    <Route
                      path="edit/:productId"
                      element={<DetailedProduct mode={Mode.Edit} />}
                    ></Route>
                  </>
                )}
                <Route
                  path="view/:productId"
                  element={<DetailedProduct mode={Mode.View} />}
                ></Route>
              </Route>
              {role === roleType.customer && (
                <Route path="/cart" element={<Cart />}></Route>
              )}
            </>
          ) : (
            <Navigate to="/" />
          )}
          <Route
            path="/unauthorized"
            element={
              <ErrorPage
                statusCode={401}
                message={"You are not authorized to visit this page"}
              />
            }
          ></Route>
        </Routes>
      </div>
    </>
  );*/
};
export default PharmaDirectives;
