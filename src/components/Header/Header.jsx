import styles from "./Header.module.css";
import { mapNavigation } from "./HeaderUtils";
const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <ul class="navbar-nav flex-row justify-content-end  link-dark">
          {mapNavigation()}
        </ul>
      </div>
    </header>
  );
};
export default Header;
