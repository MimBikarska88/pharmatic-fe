import http from "../http";
import { useMutation } from "react-query";

const useCreatePharmProductMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (productData) =>
      http.post(
        "/products",
        { ...productData },
        {
          withCredentials: true,
          xsrfCookieName: "token",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      ),
    onError,
    onSuccess,
  });
};
export default useCreatePharmProductMutation;
