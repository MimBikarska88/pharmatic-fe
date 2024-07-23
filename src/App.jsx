import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import PharmaDirectives from "./components/PharmaDirectives/PharmaDirectives";
import { BrowserRouter } from "react-router-dom";
import Modal from "./components/Modal/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { useMemo } from "react";
import { useUserStore } from "./stores/userStore";
import { roleType } from "./utils/roleTypes";
import { ResidenceType } from "./utils/residenceTypes";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  const {
    setRole,
    setVendorField,
    role,
    Vendor,
    setCurrencyEuro,
    setCurrencyDollar,
  } = useUserStore();
  useMemo(() => {
    const currentRole = localStorage.getItem("role");
    const residence = localStorage.getItem("residence");
    if (currentRole) {
      setRole(JSON.parse(currentRole).type);
    }
    if (residence) {
      const residenceType = JSON.parse(residence).type;
      setVendorField("residence", residenceType);
      if (residenceType === ResidenceType.EU) {
        setCurrencyEuro();
      }
      if (residence === ResidenceType.NON_EU) {
        setCurrencyDollar();
      }
    }
  }, [role, Vendor.residence]);
  return (
    <>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <Header />
          <Modal />
          <PharmaDirectives />
          <Footer />
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
};

export default App;
