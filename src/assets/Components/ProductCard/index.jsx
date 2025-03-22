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
} from "./styledComponents";

// Default product images
const defaultProductImages = [
  "https://res.cloudinary.com/dzsgsaxyt/image/upload/v1742669434/retailers/pricepickweblogo.png",
  "https://res.cloudinary.com/dzsgsaxyt/image/upload/v1742669434/retailers/pricepickweblogo.png",
  "https://res.cloudinary.com/dzsgsaxyt/image/upload/v1742669434/retailers/pricepickweblogo.png",
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

  return (
    <ProductCardContainer>
      <CarouselContainer>
        <Slider {...settings}>
          {productImages.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Product ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </CarouselContainer>
      <ProductTextContainer>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductDetails>About : {product.description}</ProductDetails>
        <ProductDetails>💰 Price: {product.price}</ProductDetails>
        <ProductDetails>📦 Category: {product.category}</ProductDetails>
        <ProductDetails>✅ Stock: {product.stock}</ProductDetails>

        {product.discount && (
          <ProductDetails>🔥 Discount: {product.discount}%</ProductDetails>
        )}
      </ProductTextContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
