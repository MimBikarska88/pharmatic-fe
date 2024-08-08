import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetOrderDetailsQuery(role, orderId, options = {}) {
  return useQuery({
    ...options,
    queryKey: ["order/details", role, orderId],
    queryFn: () => {
      return http.get(`/orders/${role}/${orderId}`, {
        withCredentials: true,
        xsrfCookieName: "token",
      });
    },
    select: (data) => data.data.order,
  });
}

export default useGetOrderDetailsQuery;
