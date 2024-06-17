import http from "../http";
import { useMutation } from "react-query";

const useLoginMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (email, password) => http.post("/Login", { email, password }),
    onError,
    onSuccess,
  });
};
export default useLoginMutation;
