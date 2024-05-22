import { useUserStore } from "../../stores/userStore";
import { roleType } from "../../utils/roleTypes";
import Nav from "react-bootstrap/Nav";

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
        <Nav.Link className="link-dark" href={"/"}>
          {navItem.title}
        </Nav.Link>
      ));
    case roleType.organization:
      return OrganizationNavigation.map((navItem) => (
        <Nav.Link className="link-dark" href={"/"}>
          {navItem.title}
        </Nav.Link>
      ));
    case roleType.soleProprietor:
      return SoleProprietorNavigation.map((navItem) => (
        <Nav.Link className="link-dark" href={"/"}>
          {navItem.title}
        </Nav.Link>
      ));
    case roleType.guest:
      return GuestUserNavigation.map((navItem) => (
        <Nav.Link className="link-dark" href={"/"}>
          {navItem.title}
        </Nav.Link>
      ));
  }
};

/**
<Nav.Link className="link-dark" href="#">
            Home
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            About us
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Shop
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Login
          </Nav.Link>
          <Nav.Link className="link-dark" href="#">
            Register
          </Nav.Link>
*/
