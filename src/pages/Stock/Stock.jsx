import { useNavigate } from "react-router";
import PDButton from "../../components/PDButton/PDButton";
import styles from "./Stock.module.css";
const Stock = (props) => {
  const products = [];
  const navigate = useNavigate();
  return (
    <>
      {products.length === 0 && (
        <div className="d-flex flex-column align-items-center mt-5">
          <h3 style={{ color: "#74ab5d" }}>
            <strong>
              There are currently no pharmaceutical products listed.
            </strong>
          </h3>
          <PDButton
            onClick={() => {
              navigate("/stock/create");
            }}
            style={{ width: "200px" }}
            value={"Upload product"}
            color={"purple"}
          />
        </div>
      )}
    </>
  );
};
export default Stock;
