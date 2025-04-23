"use client";
import React, { useContext, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { UserContext, UserContextProps } from "@/context/admin_context";
import "./style.css";

interface ProductListProps {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  rating: number;
  discountPrice: number;
  originalPrice: number;
  brand: string;
  color: string;
  category: string;
}

const ProductCard: React.FC<ProductListProps> = ({
  id,
  image,
  title,
  description,
  rating,
  discountPrice,
  originalPrice,
}) => {
  const { handleLoginPopUpChange } = useContext(UserContext) as UserContextProps;
  const router = useRouter();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Load wishlist from localStorage on initial render
  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setWishlist(parsedWishlist);
      setIsWishlisted(parsedWishlist.includes(id));
    }
  }, [id]);

  // Handle wishlist changes
  const toggleWishlist = (productId: string) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      handleLoginPopUpChange(true);
      return;
    }
    
    setWishlist((prev) => {
      let newWishlist;
      if (prev.includes(productId)) {
        // Remove from wishlist
        newWishlist = prev.filter(item => item !== productId);
        setIsWishlisted(false);
      } else {
        // Add to wishlist
        newWishlist = [...prev, productId];
        setIsWishlisted(true);
      }
      
      // Store updated wishlist in localStorage
      localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const handleProductClick = () => {
    router.push(`/product/${id}`);
  };

  // Truncate description
  const truncatedDescription = description?.length > 40
    ? `${description.slice(0, 35)}...`
    : description;

  // Generate star ratings  
  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <IoIosStar 
        key={index} 
        color={rating >= index + 1 ? "#EA580C" : "#ea5a0c5a"} 
        size={18} 
      />
    ));
  };

  // Calculate discount percentage
  const discountPercentage = originalPrice && 
    Math.round(((originalPrice - discountPrice) / originalPrice) * 100);

  return (
    <div className="product-card-container">
      <div className="product-image-container" onClick={handleProductClick}>
        <Image
          src={image || "/placeholder.jpg"}
          alt={title}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        />
        {discountPercentage && discountPercentage > 0 && (
          <span className="discount-badge">{discountPercentage}% OFF</span>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(id);
          }}
          className={`wishlist-icon ${isWishlisted ? "active-wishlist" : ""}`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FaHeart />
        </button>
      </div>

      <div className="product-content">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{truncatedDescription}</p>
        
        <div className="ratings">
          <span className="rating-number">{rating.toFixed(1)}</span>
          <span className="rating-icons">{renderStars()}</span>
        </div>

        <div className="navigate-product">
          <div className="price-container">
            <p className="product-price">${discountPrice.toFixed(2)}</p>
            {originalPrice && originalPrice > discountPrice && (
              <p className="original-price">${originalPrice.toFixed(2)}</p>
            )}
          </div>
          <button 
            className="product-buy-button"
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart functionality would go here
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;