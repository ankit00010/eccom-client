"use client";
import React, { useContext, useState } from "react";
import "./style.css";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { UserContext, UserContextProps } from "@/context/admin_context";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { loginPopUp, handleLoginPopUpChange } = useContext(
    UserContext
  ) as UserContextProps;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuClick = (index: number, path: string) => {
    setActiveIndex(index);
    setMenuOpen(false);
    router.push(path);
  };

  return (
    <nav className="navbar-container">
      <div className="nav-logo">
        <button
          className="nav-hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <RxCross2 size={25} /> : <RxHamburgerMenu size={25} />}
        </button>

        <span className="higlight-logo-rest">
          {" "}
          <span className="higlight-logo">A</span>xcelMart
        </span>
      </div>

      <ul className={`nav-lists ${menuOpen ? "open" : ""}`}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => handleMenuClick(index, item.path)}
          >
            {item.label}
          </li>
        ))}
      </ul>

      <div className="nav-account" onClick={() => handleLoginPopUpChange(!loginPopUp)}>
        <FiUser />
        <span >Account</span>
      </div>
      </nav>
  );
};

export default Navbar;
