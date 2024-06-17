import { roleType } from "../../utils/roleTypes";
import http from "../http";
import { useMutation } from "react-query";

export const useRegisterCustomerMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (data) => http.post("/customer/register", data),
    onError,
    onSuccess,
  });
};
