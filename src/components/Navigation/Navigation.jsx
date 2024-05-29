import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
const Navigation = () => {
  const role = useUserStore.getState().role;

  const navigationMap = {
    [roleType.admin]: [
      { title: "Home", link: "/" },
      { title: "Publish Newsletter", link: "publish-newsletter" },
      { title: "Vendors", link: "/vendors/all" },
      { title: "Customers", link: "/customers/all" },
      { title: "Logout", link: "/logout" },
    ],
    [roleType.organization]: [
      { title: "Home", link: "/" },
      { title: "Stock", link: "/products" },
      { title: "Orders", link: "/orders/:organizationId" },
      { title: "Edit Account", link: "/account/:organizationId" },
      { title: "Logout", link: "/logout" },
    ],
    [roleType.soleProprietor]: [
      { title: "Home", link: "/" },
      { title: "Stock", link: "/products" },
      { title: "Orders", link: "/orders/:proprietorId" },
      { title: "Edit Account", link: "/account/:proprietorId" },
      { title: "Logout", link: "/logout" },
    ],
    [roleType.customer]: [
      { title: "Home", link: "/" },
      { title: "Orders", link: "/orders/:userId" },
      { title: "Products", link: "/products" },
      { title: "Edit Account", link: "/account/:customerId" },
      { title: "Logout", link: "/logout" },
    ],
    [roleType.guest]: [
      { title: "Home", link: "/" },
      { title: "About us", link: "about-us" },
      { title: "Login", link: "login" },
      { title: "Register", link: "register" },
      { title: "Shop", link: "Shop" },
    ],
  };
  return (
    <>
      <div className="container">
        <ul class="navbar-nav flex-row justify-content-end  link-dark">
          {navigationMap[role].map((navItem) => (
            <li className="link-dark m-3" href={"/"}>
              {navItem.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default Navigation;
