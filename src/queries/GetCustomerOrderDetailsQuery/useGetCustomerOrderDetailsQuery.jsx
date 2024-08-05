import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetCustomerOrderDetailsQuery(orderId, options = {}) {
  return useQuery({
    ...options,
    queryKey: ["order/customer/details", orderId],
    queryFn: () => {
      return http.get(`/orders/${orderId}`, {
        withCredentials: true,
        xsrfCookieName: "token",
      });
    },
    select: (data) => data.data.order,
  });
}

export default useGetCustomerOrderDetailsQuery;
