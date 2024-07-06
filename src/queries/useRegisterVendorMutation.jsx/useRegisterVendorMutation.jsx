import http from "../http";
import { useMutation } from "react-query";

export const useRegisterVendorMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (data) =>
      http.post("/vendor/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    onError: onError,
    onSuccess: onSuccess,
  });
};
