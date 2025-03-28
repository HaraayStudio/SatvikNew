import styles from "./Footer.module.scss";
import logo from "../assets/Logo/logo.png";
import { Link } from "react-router-dom";
import img1 from "../assets/Logo/amz.png";
import img2 from "../assets/Logo/flp.png";
import img3 from "../assets/Logo/bli.png";
import img4 from "../assets/Logo/dor.png";

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Our Product", path: "/products" },
    { name: "Contact Us", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];
  const resources = [
    { name: "Help Center", path: "#" },
    { name: "Terms & Conditions", path: "/terms-conditions" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Refund & Payment", path: "/refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
  ];
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterMain}>
        {/* Logo and Info */}
        <div className={styles.MainLogo}>
          <img src={logo} alt="Satvik Raas Logo" />
          <p>
            From the farm to your table, we deliver more than just spices we
            deliver authenticity, health, and bold flavors.
          </p>
          <div className={styles.SocialMedia}>
            <div className={styles.Email}>
              <a href="mailto:customercare@satvikraas.com">
                customercare@satvikraas.com
              </a>
              <br />
              <a href="mailto:satvikraas@gmail.com">satvikraas@gmail.com</a>
            </div>
            <div className={styles.SocialMediaLinks}>
              <p>6262454595</p>
              <p>SatvikRaas by RA Brewing venture LLP</p>
            </div>
          </div>
        </div>

        {/* Explore and Resources */}
        <div className={styles.rightcontent}>
          <div className={styles.ExploreAndResources}>
            <div className={styles.Explore}>
              <h1>Explore</h1>
              {links.map((link) => (
                <Link key={link.name} to={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className={styles.Resources}>
              <h1>Resources</h1>
              {resources.map((resource) => (
                <Link key={resource.name} to={resource.path}>
                  {resource.name}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.platformicons}>
            <h3>Also Available in</h3>
            <div className={styles.platformicons}>
              <a href="https://www.amazon.in/stores/SatvikRaas/page/76C88E37-AAE5-494D-BDB8-159600EB8502?ref_=ast_bln&fbclid=PAZXh0bgNhZW0CMTEAAaZSMnzlgYfoNLeiTHrDCfZmYZd6EAcHQFwLLo1rWS05kP-J6UiblE-O7jY_aem_ZmHr9PUJBf79BC-3KOrKGg">
                {" "}
                <img src={img1} alt="" />
              </a>
              <a href="">
                <img src={img2} alt="" />
              </a>
              <a href="">
                <img src={img3} alt="" />
              </a>
              <a href="">
                {" "}
                <img src={img4} alt="" />
              </a>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={styles.Location}>
          <h1>Location</h1>
          <a>
            RA Brewing venture LLP Plot No. 662/11, Jangali Maharaj Road, Pune,
            411004
          </a>{" "}
          <div>
            {" "}
            <h1 className={styles.socialiconshead}>Social</h1>
            <a
              className={styles.socialicons}
              href="https://www.instagram.com/satvikraas/"
            >
              <svg
                width={"30px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#63E6BE"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>{" "}
            </a>
            <a
              className={styles.socialicons}
              href="https://www.youtube.com/@SatvikRaas"
            >
              <svg
                width={"30px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="#63E6BE"
                  d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                />
              </svg>
            </a>
            <a
              className={styles.socialicons}
              href="https://www.facebook.com/profile.php?id=61567262858328"
            >
              {" "}
              <svg
                width={"30px"}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#63E6BE"
                  d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className={styles.FooterBottom}>
        <div className={styles.Copywrite}>
          <p>Copyright © 2025. All rights reserved</p>
        </div>
        <div className={styles.MadeBy}>
          <p>Made by Haraay Design Studio</p>
        </div>
      </div>
    </footer>
  );
}
