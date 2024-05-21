import styles from "./Footer.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <footer className={`${styles.footer} `}>
      <Container>
        <Row>
          <Col className="m-1">
            <div className="p-2">
              <div className={`${styles["bold-footer-text"]} d-block`}>
                Contacts
              </div>
              <div className={`${styles.hr}`}></div>
              <div>
                <ul className={`${styles.listing}`}>
                  <li>
                    Vendors Service Line: <span>+358 993 058</span>
                  </li>
                  <li>
                    Customer Service Line <span>+358 006 304</span>
                  </li>
                  <li>
                    Email: <span>pharmatic@info.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="m-1">
            <div className="p-2">
              <div className={`${styles["bold-footer-text"]} d-block`}>
                Vendors
              </div>
              <div className={`${styles.hr}`}></div>
              <div>
                <ul className={styles.listing}>
                  <li>Sign in</li>
                  <li>Register</li>
                  <li>Vendor Policy</li>
                  <li>Our Vendors</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="m-1">
            <div className="p-2">
              <div className={`${styles["bold-footer-text"]} d-block`}>
                Customers
              </div>
              <div className={`${styles.hr}`}></div>
              <div>
                <ul className={styles.listing}>
                  <li>Sign in</li>
                  <li>Register</li>
                  <li>Customer Policy</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col className="m-1">
            <div className="p-2">
              <div className={`${styles["bold-footer-text"]} d-block`}>
                Let's stay connected
              </div>
              <div className={`${styles.hr}`}></div>
              <div>
                <ul className={styles.listing}>
                  <li>Newsletter</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className={`${styles.subfooter} text-center `}>
        © 2024 Pharmatic, Inc
      </div>
    </footer>
  );
};
export default Footer;
