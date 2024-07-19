import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import PDButton from "../PDButton/PDButton";
import useCurrency from "../hooks/useCurrency";
import { CurrencyType } from "../../utils/residenceTypes";

const Product = (props) => {
  const { medicationName, _id, price, photo, currency } = props;
  const role = useUserStore((state) => state.role);
  const currencyType = useUserStore((state) => state.currencyType);
  const navigate = useNavigate();
  const { calcualtedPrice } = useCurrency(price, currencyType, currency);

  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`http://localhost:8080/uploads/vendor/drugs/images/${photo}`}
        />
        <div className="card-body">
          <h5 className="card-title">
            {medicationName} - {currencyType === CurrencyType.NON_EU ? "$" : ""}
            {calcualtedPrice.toFixed(2)}
            {currencyType === CurrencyType.EU ? "€" : ""}
          </h5>
          <div className="text-center">
            <PDButton
              color="green"
              style={{ width: "6rem", margin: "0.4rem" }}
              value={"Details"}
              onClick={() => navigate(`view/${_id}`)}
            />
            {role === roleType.customer && (
              <PDButton
                color="purple"
                style={{ width: "6rem", margin: "0.4rem" }}
                value={"Add to Cart"}
              />
            )}
            {role === roleType.vendor && (
              <PDButton
                color="purple"
                style={{ width: "6rem", margin: "0.4rem" }}
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
