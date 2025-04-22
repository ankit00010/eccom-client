"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "./style.css";

const companyLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Contact Us", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
];

const contactDetails = [
  { icon: "📞", text: "+1-23-545826" },
  { icon: "✉️", text: "ankitmishra.dev11@gmail.com" },
];

const footerDescription =
  "Established in April 2025, AxcelCart is committed to delivering quality goods with an excellent shopping experience. We take pride in offering top-notch products to customers across the globe.";

const Footer = () => {
  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-main">A</span>
            <span className="logo-rest">xcelMart</span>
          </div>
          <p className="footer-description">{footerDescription}</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Company</h4>
          <ul className="footer-links">
            {companyLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => navigateTo(link.path)}
                className="footer-link-item"
              >
                {link.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Get in Touch</h4>
          {contactDetails.map((item, index) => (
            <p key={index} className="footer-contact">
              {item.icon} {item.text}
            </p>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} DevAnkit. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
