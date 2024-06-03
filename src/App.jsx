import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PharmaDirectives from "./components/PharmaDirectives/PharmaDirectives";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClientProvider } from "react-query";

const App = () => {
  return (
    <>
      <QueryClientProvider>
        <BrowserRouter>
          <Header />
          <PharmaDirectives />
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
