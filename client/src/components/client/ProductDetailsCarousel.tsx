import React from "react";

const ProductDetailsCarousel = ({ images }: { images: any }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      {/* <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((img) => (
          <img
            key={img.id}
            src={img.attributes.url}
            alt={images.attributes?.name}
          />
        ))}
      </Carousel> */}
    </div>
  );
};

export default ProductDetailsCarousel;
