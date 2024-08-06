import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetVendorOrdersQuery(options = {}) {
  return useQuery({
    ...options,
    queryKey: ["orders/vendor"],
    queryFn: () => {
      return http.get("/orders/vendor", {
        withCredentials: true,
        xsrfCookieName: "token",
      });
    },
    select: (data) => {
      return data.data.orders;
    },
  });
}

export default useGetVendorOrdersQuery;
