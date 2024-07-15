const Product = (props) => {
  console.log(props);
  const { medicationName, id, indications, priceEu, priceNonEu, photo } = props;
  return (
    <>
      <div className="card m-2" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src={`http://localhost:8080/uploads/vendor/drugs/images/${photo}`}
        />
        <div className="card-body">
          <h5 className="card-title">{medicationName}</h5>
        </div>
      </div>
    </>
  );
};
export default Product;
