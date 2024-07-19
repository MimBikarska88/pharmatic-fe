import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetProductByIdQuery(productId, options = {}) {
  return useQuery({
    ...options,
    queryKey: ["pharmaceutical/stock/id", productId],
    queryFn: () => {
      return http.get(`/vendor/products/${productId}`);
    },
  });
}

export default useGetProductByIdQuery;
