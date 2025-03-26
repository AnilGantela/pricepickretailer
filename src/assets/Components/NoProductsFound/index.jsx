import React from "react";
import {
  Container,
  Image,
  TextContainer,
  Title,
  Description,
  ReloadButton, // Updated button component
} from "./styledComponents";

const ProductsNotFound = () => {
  const handleReload = () => {
    window.location.reload(); // Reload the current page
  };

  return (
    <Container>
      <Image src="/Empty-pana.png" alt="No Products Found" />
      <TextContainer>
        <Title>Oops! No Products Found</Title>
        <Description>
          Sorry, we couldn't find any products matching your search criteria.
        </Description>
        <ReloadButton onClick={handleReload}>Reload</ReloadButton>{" "}
        {/* Reload button */}
      </TextContainer>
    </Container>
  );
};

export default ProductsNotFound;
