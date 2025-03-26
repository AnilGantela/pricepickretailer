import React from "react";
import {
  Container,
  Image,
  TextContainer,
  Title,
  Description,
  HomeButton,
} from "./styledComponents";

const PageNotFound = () => {
  const handleGoHome = () => {
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <Container>
      <Image src="/pagenotfound.png" alt="Page Not Found" />
      <TextContainer>
        <Title>404 - Page Not Found</Title>
        <Description>
          Sorry, the page you are looking for does not exist.
        </Description>
        <HomeButton onClick={handleGoHome}>Go to Home</HomeButton>
      </TextContainer>
    </Container>
  );
};

export default PageNotFound;
