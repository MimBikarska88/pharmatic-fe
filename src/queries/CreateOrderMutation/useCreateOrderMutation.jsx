import http from "../http";
import { useMutation } from "react-query";

const useCreateOrderMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (cart) =>
      http.post("/orders", cart, {
        withCredentials: true,
        xsrfCookieName: "token",
      }),
    onError,
    onSuccess,
  });
};
export default useCreateOrderMutation;
