"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import HeadPhones from "@/public/images/header_headphone_image.webp";
import MacBook from "@/public/images/header_macbook_image.webp";
import PlayStation from "@/public/images/header_playstation_image.webp";
import styles from "./banner.module.css";

const ProductsBanner = () => {
  const products = [
    {
      offer: "Limited Time Offer 30% off",
      title: "Experience Pure Sound-Your Perfect Headphones Awaits!",
      navigateButton: "Buy Now",
      navigateArrow: "Learn More",
      image: HeadPhones,
    },
    {
      offer: "Hurry up only few lefts!",
      title: "Next-Level Gaming Starts Here - Discover PlayStation 5 Today!",
      navigateButton: "Shop Now",
      navigateArrow: "Explore Deals",
      image: PlayStation,
    },
    {
      offer: "Exclusive Deal 40% Off",
      title: "Power Meets Elegance  Apple MacBook Pro is Here for you!",
      navigateButton: "Order Now",
      navigateArrow: "Find More",
      image: MacBook,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNextSlide = () => {
    setDirection("next");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 450);
  };

  const goToSlide = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setTimeout(() => {
        setAnimating(false);
      }, 50);
    }, 450);
  };

  return (
    <>
      <div className={styles.bannerContainer}>
        <div
          className={`${styles.leftContent} ${
            animating
              ? direction === "next"
                ? styles.slideOutLeft
                : styles.slideOutRight
              : direction === "next"
              ? styles.slideInRight
              : styles.slideInLeft
          }`}
        >
          <p className={styles.offer}>{products[currentIndex].offer}</p>
          <h1 className={styles.title}>{products[currentIndex].title}</h1>
          <div className={styles.navigateProducts}>
            <button className={styles.navigateButton}>
              {products[currentIndex].navigateButton}
            </button>
            <a className={styles.navigateArrow}>
              <span>{products[currentIndex].navigateArrow}</span>
              <FaArrowRightLong />
            </a>
          </div>
        </div>

        <div
          className={`${styles.imageSection} ${
            animating
              ? direction === "next"
                ? styles.slideOutRight
                : styles.slideOutLeft
              : direction === "next"
              ? styles.slideInRight
              : styles.slideInLeft
          }`}
        >
          <Image
            src={products[currentIndex].image}
            alt="Product"
            className={styles.productImage}
          />
        </div>
      </div>

      <div className={styles.controlsContainer}>
        <ul className={styles.slideIndex}>
          {products.map((_, index) => (
            <li key={index} onClick={() => goToSlide(index)}>
              <span
                className={`${styles.dots} ${
                  currentIndex === index ? styles.activeDot : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductsBanner;
