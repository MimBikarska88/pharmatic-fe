import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import PDButton from "../PDButton/PDButton";

const Product = (props) => {
  const { medicationName, _id, indications, priceEu, priceNonEu, photo } =
    props;
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();
  return (
    <>
      <div className="card m-3" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`http://localhost:8080/uploads/vendor/drugs/images/${photo}`}
        />
        <div className="card-body">
          <h5 className="card-title">{medicationName}</h5>
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
