import http from "../http";
import { useMutation } from "react-query";

export const useRegisterCustomerMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      try {
        const response = await http.post("/customer/register", data);
        return response.data;
      } catch (error) {
        throw new Error("Error registering customer");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
