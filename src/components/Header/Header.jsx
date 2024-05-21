import Container from "react-bootstrap/Container";
import styles from "./Header.module.css";
import Nav from "react-bootstrap/Nav";
const Header = (props) => {
  return (
    <header className={styles.header}>
      <Container>
        <Nav className="justify-content-end flex-grow-1 pe-3 link-dark">
          <Nav.Link className="link-dark" href="#">
            Home
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            About us
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Shop
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Login
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Register
          </Nav.Link>
        </Nav>
      </Container>
    </header>
  );
};
export default Header;
