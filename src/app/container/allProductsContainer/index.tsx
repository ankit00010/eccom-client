import ProductList from "@/components/productsList";
import React from "react";
import "./style.css";

interface AllProductsContainerProps {
  showHeader?: boolean;
  limit?: number;
  showFilter?: boolean;
}
const AllProductsContainer: React.FC<AllProductsContainerProps> = ({
  showHeader,
  limit,
  showFilter,
}) => {
  return (
    <div className={`${showHeader ? "all-products" : "home-products"}`}>
      {showHeader ? (
        <h2 className="header-text">
          All <span className="highlighted-word">Products</span>
        </h2>
      ) : (
        <h2 className="popuplar-header-text">Popular Products</h2>
      )}

      <ProductList showFilter={showFilter} limit={limit} />
    </div>
  );
};

export default AllProductsContainer;
