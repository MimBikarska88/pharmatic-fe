import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import { CurrencyType } from "../../utils/residenceTypes";
import { addProductToCart } from "../../utils/addToCartUtils";

import PDButton from "../PDButton/PDButton";
import useCurrency from "../hooks/useCurrency";
import styles from "./Product.module.css";

const Product = (props) => {
  const { medicationName, _id, price, photo, currency, stock } = props;
  const role = useUserStore((state) => state.role);
  const currencyType = useUserStore((state) => state.currencyType);
  const navigate = useNavigate();
  const { calculatePrice } = useCurrency(currencyType);

  return (
    <>
      <div
        className={`card m-3 ${stock === 0 && styles["out-of-stock"]}`}
        style={{ width: "18rem" }}
      >
        <img
          className="card-img-top"
          style={{ height: "263px", width: "263px" }}
          src={`http://localhost:8080/uploads/vendor/drugs/images/${photo}`}
        />
        {stock === 0}
        <div className="card-body">
          <h5 className="card-title">
            {role === roleType.customer && stock === 0
              ? `Out of Stock`
              : `${medicationName} - ${
                  currencyType === CurrencyType.NON_EU ? "$" : ""
                }
            ${calculatePrice(price, currency).toFixed(2)}
            ${currencyType === CurrencyType.EU ? "€" : ""}`}
          </h5>
          <div className="text-center">
            {role === roleType.vendor ||
              (role === roleType.customer && stock > 0 && (
                <PDButton
                  color="green"
                  style={{ width: "6rem", margin: "0.4rem" }}
                  value={"Details"}
                  onClick={() => navigate(`view/${_id}`)}
                />
              ))}

            {role === roleType.customer && stock > 0 && (
              <PDButton
                color="purple"
                style={{
                  width: "6rem",
                  margin: "0.4rem",
                  whiteSpace: "nowrap",
                }}
                onClick={() => addProductToCart(props)}
                value={"To Cart"}
              />
            )}
            {role === roleType.vendor && (
              <PDButton
                color="purple"
                style={{
                  width: "6rem",
                  margin: "0.4rem",
                }}
                value={"Edit"}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Product;
