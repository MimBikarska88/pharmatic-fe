import { useUserStore } from "../../stores/userStore";

const Home = (props) => {
  const Vendor = useUserStore((state) => state.Vendor);
  console.log(Vendor.residence);
  return (
    <>
      <h4>Home</h4>
    </>
  );
};
export default Home;
