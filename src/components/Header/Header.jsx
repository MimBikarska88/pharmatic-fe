import Container from "react-bootstrap/Container";
import styles from "./Header.module.css";
import Nav from "react-bootstrap/Nav";
import { mapNavigation } from "./HeaderUtils";
const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Nav className="justify-content-end flex-grow-1 pe-3 link-dark">
          {mapNavigation()}
        </Nav>
      </Container>
    </header>
  );
};
export default Header;
