import { useQuery } from "react-query";
import http from "../http";

function useGetMapLocationQuery(position, options = {}) {
  return useQuery({
    ...options,
    queryKey: ["location", position],
    queryFn: () => {
      const lat = position[0];
      const lng = position[1];
      return http.get(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );
    },
    enabled: !!position,
  });
}

export default useGetMapLocationQuery;
