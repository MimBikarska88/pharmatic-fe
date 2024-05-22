import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PharmaDirectives from "./components/PharmaDirectives/PharmaDirectives";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <PharmaDirectives />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
