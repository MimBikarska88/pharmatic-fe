import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";

export const GuestUserNavigation = [
  { title: "Home", link: "/" },
  { title: "About us", link: "about-us" },
  { title: "Login", link: "login" },
  { title: "Register", link: "register" },
  { title: "Shop", link: "Shop" },
];
export const AdminNavigation = [
  { title: "Home", link: "/" },
  { title: "Publish Newsletter", link: "publish-newsletter" },
  { title: "Vendors", link: "/vendors/all" },
  { title: "Customers", link: "/customers/all" },
  { title: "Logout", link: "/logout" },
];

export const OrganizationNavigation = [
  { title: "Home", link: "/" },
  { title: "Stock", link: "/products" },
  { title: "Orders", link: "/orders/:organizationId" },
  { title: "Edit Account", link: "/account/:organizationId" },
  { title: "Logout", link: "/logout" },
];

export const SoleProprietorNavigation = [
  { title: "Home", link: "/" },
  { title: "Stock", link: "/products" },
  { title: "Orders", link: "/orders/:proprietorId" },
  { title: "Edit Account", link: "/account/:proprietorId" },
  { title: "Logout", link: "/logout" },
];

export const CustomerNavigation = [
  { title: "Home", link: "/" },
  { title: "Orders", link: "/orders/:userId" },
  { title: "Products", link: "/products" },
  { title: "Edit Account", link: "/account/:customerId" },
  { title: "Logout", link: "/logout" },
];
export const mapNavigation = () => {
  const role = useUserStore.getState().role;
  switch (role) {
    case roleType.admin:
      return AdminNavigation.map((navItem) => (
        <li className="link-dark m-3" href={"/"}>
          {navItem.title}
        </li>
      ));
    case roleType.organization:
      return OrganizationNavigation.map((navItem) => (
        <li className="link-dark m-3" href={"/"}>
          {navItem.title}
        </li>
      ));
    case roleType.soleProprietor:
      return SoleProprietorNavigation.map((navItem) => (
        <li className="link-dark m-3" href={"/"}>
          {navItem.title}
        </li>
      ));
    case roleType.customer:
      return CustomerNavigation.map((navItem) => (
        <li className="link-dark m-3" href={"/"}>
          {navItem.title}
        </li>
      ));
    case roleType.guest:
      return GuestUserNavigation.map((navItem) => (
        <li className="link-dark m-3" href={"/"}>
          {navItem.title}
        </li>
      ));
    default:
      <></>;
  }
};
