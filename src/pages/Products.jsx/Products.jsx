import { useUserStore } from "../../stores/userStore";
import PDInput from "../../components/PDInput/PDInput";
import PDSelect from "../../components/PDSelect/PDSelect";
const Products = () => {
  const { role, SearchParams } = useUserStore();
  return (
    <>
      <div className="d-flex flex-row justify-content-center">
        <PDSelect label="Classification" className="m-1" />
        <PDInput label="Vendor" className="m-1" />
        <PDInput label="Search" className="m-1" />
      </div>
    </>
  );
};
export default Products;
