import { useNavigate } from "react-router";
import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import useLogoutMutation from "../../queries/LogoutMutation/useLogoutMutation";
import eu from "../../static/img/icons/eu.png";
import nonEu from "../../static/img/icons/nonEu.png";
const Navigation = () => {
  const {
    role,
    setRole,
    setCurrencyDollar,
    setCurrencyEuro,
    resetCustomerState,
    resetVendorState,
  } = useUserStore();
  const navigate = useNavigate();

  const navigationMap = {
    [roleType.vendor]: [
      { title: "Home", link: "/" },
      { title: "Stock", link: "/stock" },
      { title: "Orders", link: "/orders/vendor" },
      { title: "Edit Account", link: "/account" },
      { title: "Logout" },
    ],
    [roleType.customer]: [
      { title: "Home", link: "/" },
      { title: "Orders", link: "/orders/customer" },
      { title: "Products", link: "/stock" },
      { title: "Edit Account", link: "/account/customer" },
      { title: "Cart", link: "/cart" },
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
  const onSuccess = () => {
    localStorage.clear();
    localStorage.setItem("role", JSON.stringify({ type: roleType.guest }));
    setRole(roleType.guest);
    resetCustomerState();
    resetVendorState();
  };

  const logoutMutation = useLogoutMutation(role, onSuccess, () => {
    navigate("/"); // navigate to error page
  });
  const onLogoutClick = (e) => {
    logoutMutation.mutate();
  };
  return (
    <>
      <div className="container">
        <ul className="navbar-nav flex-row justify-content-end  link-dark">
          {navigationMap[role].map((navItem, _index) =>
            navItem.title.toLowerCase() === "logout" ? (
              <li
                key={_index}
                className="link-dark m-3"
                style={{ cursor: "pointer" }}
                onClick={onLogoutClick}
              >
                {navItem.title}
              </li>
            ) : (
              <li key={_index} className="link-dark m-3">
                <a
                  style={{
                    textDecoration: "none",
                    color: "black",
                    cursor: "pointer",
                  }}
                  onClick={(e) => navigate(navItem.link)}
                >
                  {navItem.title}
                </a>
              </li>
            )
          )}
          {role !== roleType.guest && (
            <>
              <li
                style={{
                  cursor: "pointer",
                }}
                className="link-dark m-3"
              >
                <img src={eu} onClick={setCurrencyEuro} />
              </li>
              <li
                style={{
                  cursor: "pointer",
                }}
                className="link-dark mt-3"
              >
                <img src={nonEu} onClick={setCurrencyDollar} />
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
export default Navigation;
