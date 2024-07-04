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

const client = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  const setRole = useUserStore((state) => state.setRole);
  useMemo(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setRole(JSON.parse(role));
    }
  });
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
