import { roleType } from "../../utils/roleTypes";
import http from "../http";
import { useMutation } from "react-query";
const useLogoutMutation = (role, onSuccess, onError) => {
  return useMutation({
    mutationFn: () =>
      http.post(
        role === roleType.vendor ? "/vendor/logout" : "/customer/logout",
        {
          withCredentials: true,
          xsrfCookieName: "token",
        }
      ),
    onSuccess,
    onError,
  });
};

export default useLogoutMutation;
