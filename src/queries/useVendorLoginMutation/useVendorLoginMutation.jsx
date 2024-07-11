import http from "../http";
import { useMutation } from "react-query";

const useVendorLoginMutation = (onError, onSuccess) => {
  return useMutation({
    mutationFn: (data) =>
      http.post(
        "/vendor/login",
        {
          residence: data.residence,
          FDANumber: data.FDANumber,
          EORI: data.EORI,
          password: data.password,
        },
        {
          withCredentials: true,
          xsrfCookieName: "token",
        }
      ),
    onError,
    onSuccess,
  });
};
export default useVendorLoginMutation;
