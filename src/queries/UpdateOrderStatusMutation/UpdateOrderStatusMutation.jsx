import http from "../http";
import { useMutation } from "react-query";

const useUpdateOrderStatusMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (data) => {
      return http.post(
        `/orders/${data.orderId}`,
        { status: data.status },
        {
          withCredentials: true,
          xsrfCookieName: "token",
        }
      );
    },
    onError,
    onSuccess,
  });
};
export default useUpdateOrderStatusMutation;
