import http from "../http";
import { useMutation } from "react-query";

const useCreatePharmProductMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (productData) =>
      http.post(
        "/products",
        { productData },
        { withCredentials: true, xsrfCookieName: "token" }
      ),
    onError,
    onSuccess,
  });
};
export default useCreatePharmProductMutation;
