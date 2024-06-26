import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import useLogoutMutation from "../../queries/LogoutMutation/useLogoutMutation";
const Navigation = () => {
  const role = useUserStore((state) => state.role);
  const setRole = useUserStore((state) => state.setRole);
  const navigate = useNavigate();

  const navigationMap = {
    [roleType.admin]: [
      { title: "Home", link: "/" },
      { title: "Publish Newsletter", link: "publish-newsletter" },
      { title: "Vendors", link: "/vendors/all" },
      { title: "Customers", link: "/customers/all" },
      { title: "Logout", link: "/logout" },
    ],
    [roleType.vendor]: [
      { title: "Home", link: "/" },
      { title: "Stock", link: "/products" },
      { title: "Orders", link: "/orders/" },
      { title: "Edit Account", link: "/account/" },
      { title: "Logout" },
    ],
    [roleType.soleProprietor]: [
      { title: "Home", link: "/" },
      { title: "Stock", link: "/products" },
      { title: "Orders", link: "/orders/" },
      { title: "Edit Account", link: "/account/" },
      { title: "Logout" },
    ],
    [roleType.customer]: [
      { title: "Home", link: "/" },
      { title: "Orders", link: "/orders/" },
      { title: "Products", link: "/products" },
      { title: "Edit Account", link: "/account/" },
      { title: "Logout" },
    ],
    [roleType.guest]: [
      { title: "Home", link: "/" },
      { title: "About us", link: "about-us" },
      { title: "Login", link: "login" },
      { title: "Register", link: "register" },
      { title: "Shop", link: "Shop" },
    ],
  };

  const logoutMutation = useLogoutMutation();
  const onLogoutClick = async (e) => {
    e.preventDefault();
    await logoutMutation.mutateAsync();
    localStorage.clear();
    setRole(roleType.guest);
    navigate("/");
  };
  return (
    <>
      <div className="container">
        <ul class="navbar-nav flex-row justify-content-end  link-dark">
          {navigationMap[role].map((navItem) =>
            navItem.title.toLowerCase() === "logout" ? (
              <li
                className="link-dark m-3"
                style={{ cursor: "pointer" }}
                onClick={onLogoutClick}
              >
                {navItem.title}
              </li>
            ) : (
              <li className="link-dark m-3">
                <a
                  style={{ textDecoration: "none", color: "black" }}
                  href={navItem.link}
                >
                  {navItem.title}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </>
  );
};
export default Navigation;
