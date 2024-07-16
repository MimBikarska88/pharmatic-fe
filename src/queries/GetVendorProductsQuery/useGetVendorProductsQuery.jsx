import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetVendorProductsQuery(options = {}) {
  return useQuery({
    ...options,
    queryKey: ["vendor/products"],
    queryFn: () => {
      return http.get("/vendor/products", {
        withCredentials: true, // This ensures cookies are sent with requests
        xsrfCookieName: "token",
      });
    },
    select: (data) => {
      return data.data.products;
    },
  });
}

export default useGetVendorProductsQuery;
