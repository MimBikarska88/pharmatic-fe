import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetCustomerOrdersQuery(options = {}) {
  return useQuery({
    ...options,
    queryKey: ["orders/customer"],
    queryFn: () => {
      return http.get(`/orders/customer`, {
        withCredentials: true,
        xsrfCookieName: "token",
      });
    },
    select: (data) => data.data.orders,
  });
}

export default useGetCustomerOrdersQuery;
