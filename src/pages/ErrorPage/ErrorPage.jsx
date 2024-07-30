import { useNavigate } from "react-router";
import PDButton from "../../components/PDButton/PDButton";

const ErrorPage = (props) => {
  const { statusCode, message } = props;
  const navigate = useNavigate();
  return (
    <div className="d-block m-auto text-center">
      <div
        style={{
          color: "#8162b6",
          fontSize: "56px",
          display: "block",
          marginTop: "5rem",
        }}
      >
        {statusCode || 404}
      </div>
      <div style={{ color: "#decbff", fontSize: "32px", display: "block" }}>
        {message || <span>Something went wrong. Please, try again later.</span>}
      </div>
      <div style={{ color: "#decbff", marginTop: "3rem", display: "block" }}>
        <PDButton
          color={"purple"}
          value={"Return to home page"}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
export default ErrorPage;
