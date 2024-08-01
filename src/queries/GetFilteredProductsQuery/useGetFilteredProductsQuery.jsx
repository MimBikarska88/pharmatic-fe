import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
const useGetFilteredProductsQuery = (
  classification,
  vendor,
  searchText,
  options = {}
) => {
  return useQuery({
    ...options,
    queryKey: ["customer/products"],
    queryFn: () => {
      const params = new URLSearchParams();
      if (classification) params.append("classification", classification);
      if (vendor) params.append("vendor", vendor);
      if (searchText) params.append("searchText", searchText);
      return http.get("/products?" + params.toString(), {
        withCredentials: true, // This ensures cookies are sent with requests
        xsrfCookieName: "token",
      });
    },
    select: (data) => {
      return data.data;
    },
  });
};

export default useGetFilteredProductsQuery;
