import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ProductCardContainer,
  CarouselContainer,
  ProductTextContainer,
  ProductTitle,
  ProductDetails,
  ProductLeftContainer,
  ProductDescriptionContainer,
  ProductDescription,
} from "./styledComponents";

const defaultProductImages = [
  "path_to_default_image_1.jpg",
  "path_to_default_image_2.jpg",
  "path_to_default_image_3.jpg",
];

const ProductCard = ({ product, productImages = defaultProductImages }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const getImageSrc = (image) => {
    // If the image is a URL, return it directly
    if (typeof image === "string") {
      return image;
    }
    // If it's a file object, create a URL from it
    if (image instanceof File) {
      return URL.createObjectURL(image);
    }
    // Fallback for default images or unknown formats
    return "path_to_default_image.jpg";
  };

  return (
    <ProductCardContainer>
      <ProductLeftContainer>
        <CarouselContainer>
          <Slider {...settings}>
            {productImages.map((image, index) => (
              <div key={index}>
                <img
                  key={index}
                  src={getImageSrc(image)} // Use the function to get the correct image source
                  alt={`Product Image ${index}`}
                />
              </div>
            ))}
          </Slider>
        </CarouselContainer>
        <ProductDescriptionContainer>
          <ProductDescription>About : {product.description}</ProductDescription>
        </ProductDescriptionContainer>
      </ProductLeftContainer>
      <ProductTextContainer>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDetails>💰 Price: {product.price}</ProductDetails>
        <ProductDetails>✅ Stock: {product.stock}</ProductDetails>

        {product.discount && (
          <ProductDetails>🔥 Discount: {product.discount}%</ProductDetails>
        )}
      </ProductTextContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
