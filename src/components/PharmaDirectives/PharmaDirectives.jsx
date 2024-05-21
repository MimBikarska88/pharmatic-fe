import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import styles from "./PharmaDirectives.module.css";
const PharmaDirectives = () => {
  // must include paths to all pages no matter if visible or not
  const router = createBrowserRouter([
    {
      path: "/home",
      element: <div>Home</div>,
    },
    {
      path: "/about-us",
      element: <div>About us</div>,
    },
    {
      path: "/login",
      element: <div>login</div>,
    },
    {
      path: "/register",
      element: <div>Register</div>,
    },
  ]);
  return (
    <Container className={styles.directive}>
      <RouterProvider router={router}> </RouterProvider>
    </Container>
  );
};
export default PharmaDirectives;
