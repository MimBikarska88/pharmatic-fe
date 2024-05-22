import Container from "react-bootstrap/esm/Container";
import styles from "./PharmaDirectives.module.css";
import { Route, Routes } from "react-router";
const PharmaDirectives = () => {
  return (
    <Container className={styles.directive}>
      <Routes>
        <Route path="home" element={<h3>Home</h3>}></Route>
      </Routes>
    </Container>
  );
};
export default PharmaDirectives;
