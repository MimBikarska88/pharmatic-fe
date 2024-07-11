import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetVendorLicensesQuery(options = {}) {
  return useQuery({
    ...options,
    queryKey: ["vendor/licenses"],
    queryFn: () => {
      return http.get("/vendor/licenses", {
        withCredentials: true,
        xsrfCookieName: "token",
      });
    },
    select: (data) => {
      console.log(data.data);
      const filtered = Object.values(data?.data?.licenses).map((item) => {
        return {
          value: item.code,
          label: item.label,
        };
      });
      return filtered;
    },
  });
}

export default useGetVendorLicensesQuery;
