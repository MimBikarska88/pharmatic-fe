import { useUserStore } from "../../stores/userStore";
import styles from "./Home.module.css";
import second from "../../static/img/backgrounds/second.jpg";
import first from "../../static/img/backgrounds/first.jpeg";
const Home = (props) => {
  const Vendor = useUserStore((state) => state.Vendor);
  console.log("home component rendered");
  return (
    <>
      <div className={styles["grid-container"]}>
        <img className={styles.second} src={second} />
        <div className={styles.third}>
          <div className={styles.info}>
            Join the Pharmatic Vendor Program and expand your business by
            selling healthcare products on our trusted online platform.
            Pharmatic offers a seamless and secure e-commerce solution designed
            specifically for pharmaceutical vendors. As a vendor, you'll benefit
            from our extensive customer base, user-friendly interface, and
            robust marketing support.
          </div>
        </div>
        <div className={styles.thirdHalf}>
          <div className={styles.info}>
            Manage your own business! If you are a vendor register{" "}
            <a href="/register/vendor">here</a>
          </div>
        </div>
        <img className={styles.first} src={first} />
        <div className={styles.fourth}>
          <div className={styles.info}>
            Pharmatic is your trusted local pharmacy dedicated to providing
            high-quality healthcare products and services. We offer a wide range
            of prescription medications, over-the-counter drugs, vitamins, and
            health supplements. Committed to your well-being, Pharmatic ensures
            convenient and affordable access to all your health needs.
          </div>
        </div>
        <div className={styles.fourthHalf}>
          <div className={styles.info}>
            If you would like to be our customer register{" "}
            <a href="/register/customer">here</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
