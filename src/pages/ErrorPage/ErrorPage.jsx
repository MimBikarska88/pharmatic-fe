import PDButton from "../../components/PDButton/PDButton";

const ErrorPage = () => {
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
        404
      </div>
      <div style={{ color: "#decbff", fontSize: "32px", display: "block" }}>
        Something went wrong. Please, try again later.
      </div>
      <div style={{ color: "#decbff", marginTop: "3rem", display: "block" }}>
        <PDButton color={"purple"} value={"Return to home page"} />
      </div>
    </div>
  );
};
export default ErrorPage;
