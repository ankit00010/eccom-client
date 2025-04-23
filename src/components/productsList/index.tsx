"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../cards/product";
import { productList } from "@/constants/products/productsList";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import "./style.css";
import { useRouter } from "next/navigation";
interface ProductListProps {
  limit?: number;
  showFilter?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ limit, showFilter }) => {
  const router=useRouter();
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);

  // Extract unique categories from product list
  const categories = [
    "all",
    ...new Set(productList.map((product) => product.category)),
  ];

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter products by category
  const filterByCategory = (category: string) => {
    setIsLoading(true);
    setActiveCategory(category);

    setTimeout(() => {
      if (category === "all") {
        setFilteredProducts(productList);
      } else {
        setFilteredProducts(
          productList.filter((product) => product.category === category)
        );
      }
      setIsLoading(false);
    }, 300);
  };

  // Toggle view mode between grid and list
  const toggleViewMode = (mode: string) => {
    setViewMode(mode);
  };

  return (
    <section className="product-list-container">
      <div className="product-list-header">

        {showFilter && (
          <div className="product-controls">
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter-btn ${
                    activeCategory === category ? "active" : ""
                  }`}
                  onClick={() => filterByCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            <div className="view-controls">
              <button
                className={`view-control-btn ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => toggleViewMode("grid")}
                aria-label="Grid view"
              >
                <IoGridOutline size={18} />
              </button>
              <button
                className={`view-control-btn ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => toggleViewMode("list")}
                aria-label="List view"
              >
                <FaList size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="products-loading-skeleton">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="product-skeleton">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-title"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-price"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div
          className={`productlist-container ${
            viewMode === "list" ? "list-view" : "grid-view"
          }`}
        >
          {filteredProducts
            .slice(0, limit ?? filteredProducts.length)
            .map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
        </div>
      ) : (
        <div className="no-products-found">
          <p>No products found in this category.</p>
        </div>
      )}

      {filteredProducts.length > 0 && !showFilter && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={()=>router.push('/all-products')}>Load More Products</button>
        </div>
      )}
    </section>
  );
};

export default ProductList;
