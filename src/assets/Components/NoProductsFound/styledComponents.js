import styled from "styled-components";

// Main container to center the content
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70%; // Ensure the container takes at least the full viewport height
  background-color: #f8f9fa;
  text-align: center;
  margin-top: 40px;
`;

// Image container with increased size
export const Image = styled.img`
  width: 400px; // Adjust size as needed
  height: 80%;
  margin-bottom: 30px;
`;

// Text container
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Title (Heading)
export const Title = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #ff4d4f;
  margin-bottom: 10px;
`;

// Description text
export const Description = styled.p`
  font-size: 18px;
  color: #6c757d;
  margin-bottom: 20px;
`;

// Reload button style
export const ReloadButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745; // Green color for reload action
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838; // Darker green on hover
  }
`;
