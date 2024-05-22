import { isEmpty } from "./basicValidation.util";

export const isUserLoggedIn = () => {
  const { Admin, Customer, SoleProprietor, Organization } =
    useUserStore.getState();

  // check whether JWT is set
  const token = localStorage.getItem("token");

  return (
    !isEmpty(token) &&
    !(
      isEmpty(Admin) ||
      isEmpty(Customer) ||
      isEmpty(SoleProprietor) ||
      isEmpty(Organization)
    )
  );
};
