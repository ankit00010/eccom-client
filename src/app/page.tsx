import ProductsBanner from "@/components/banner";
import AllProductsContainer from "./container/allProductsContainer";

export default function Home() {
  return (
    <div>
      <ProductsBanner />
      <AllProductsContainer showHeader={false} limit={8} showFilter={false} />
    </div>
  );
}
