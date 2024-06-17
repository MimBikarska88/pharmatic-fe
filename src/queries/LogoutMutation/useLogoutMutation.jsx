import http from "../http";
import { useMutation } from "react-query";
const useLogoutMutation = () => {
  return useMutation(() => {
    return http.post("/Logout");
  });
};
export default useLogoutMutation;
