import http from "../http";
import { useMutation } from "react-query";

const useUpdatePharmProductMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (productData) => {
      return http.put(
        `/products/${productData._id}`,
        { ...productData },
        {
          withCredentials: true,
          xsrfCookieName: "token",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    },
    onError,
    onSuccess,
  });
};
export default useUpdatePharmProductMutation;
