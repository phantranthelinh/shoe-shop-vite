import ProductItem from "../../Product/ProductItem";

const ProductList = () => {
  return (
    <div className="small-container">
      <h2 className="text-3xl text-center title">Featured Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 10 }).map((_, index) => {
          return <ProductItem id={index} key={index} />;
        })}
      </div>
      <h2 className="text-3xl text-center title">Latest Products</h2>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => {
          return <ProductItem id={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
