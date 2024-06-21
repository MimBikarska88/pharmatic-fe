import http from "../http";
import { useMutation } from "react-query";

export const useRegisterCustomerMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (data) =>
      http.post("/customer/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onError,
    onSuccess,
  });
};
