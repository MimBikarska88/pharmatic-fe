import http from "../http";
import { useMutation } from "react-query";

const useLoginMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: ({ email, password }) =>
      http.post(
        "/customer/login",
        { email, password },
        { withCredentials: true, xsrfCookieName: "token" }
      ),
    onError,
    onSuccess,
  });
};
export default useLoginMutation;
