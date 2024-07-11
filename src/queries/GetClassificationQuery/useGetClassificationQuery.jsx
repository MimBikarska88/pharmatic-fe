import { useQuery } from "react-query";
import http from "../http";

//  have to filter data
function useGetClassificationQuery(options = {}) {
  return useQuery({
    ...options,
    queryKey: ["pharmaceutical/classifications"],
    queryFn: () => {
      return http.get("/pharmaceutical/classifications", {
        withCredentials: true, // This ensures cookies are sent with requests
        xsrfCookieName: "token",
      });
    },
    select: (data) => {
      const filtered = data?.data.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      });
      return filtered;
    },
  });
}

export default useGetClassificationQuery;
