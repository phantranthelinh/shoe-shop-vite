import { Link } from "@tanstack/react-router";

const ProductItem = ({
  id,
  name = "Downshifter Sports Shoes",
  price = 5000000,
}: {
  name?: string;
  id: string | number;
  price?: number;
}) => {
  return (
    <div>
      <Link href={`/products/${id}`}>
        <div className="w-[200px]">
          <img src="images/product-11.jpg" />
        </div>
      </Link>
      <Link href={`/products/${id}`}>
        <h4>{name}</h4>
      </Link>
      <div className="rating">
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star" />
        <i className="fa fa-star-half-o" />
        <i className="fa fa-star-o" />
      </div>
      <p>{`${price.toLocaleString()} VND`}</p>
    </div>
  );
};

export default ProductItem;
