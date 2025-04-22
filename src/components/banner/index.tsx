import Image from "next/image";
import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import HeadPhones from "@/public/header_headphone_image.webp";
import styles from "./banner.module.css";

const ProductsBanner = () => {
  return (
    <section className={styles.bannerContainer}>
      {/* Left content Section */}
      <div className={styles.leftContent}>
        <p className={styles.offer}>Limited Time Offer 30% off</p>
        <h1 className={styles.title}>
          Experience Pure Sound-Your Perfect Headphones Awaits!
        </h1>

        {/* Button and the products path */}
        <div className={styles.navigateProducts}>
          <button className={styles.navigateButton}>Buy Now</button>

          <a href="/shop" className={styles.navigateArrow}>
            Find More
            <span>
              <FaArrowRightLong />
            </span>
          </a>
        </div>
      </div>
      {/* Right Image Section */}
      <div className={styles.imageSection}>
        <Image
          src={HeadPhones}
          alt="headphones image"
          className={styles.productImage}
        />
      </div>
    </section>
  );
};

export default ProductsBanner;