import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PharmaDirectives from "./components/PharmaDirectives/PharmaDirectives";
import { Fragment } from "react";

const App = () => {
  return (
    <>
      <Header />
      <PharmaDirectives />
      <Footer />
    </>
  );
};

export default App;
