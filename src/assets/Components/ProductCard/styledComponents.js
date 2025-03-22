import styled from "styled-components";

export const ProductCardContainer = styled.li`
  width: 100%;
  max-width: 300px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #0000c5;
  position: relative;
  height: 430px;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 15px;
  background-color: white;
  overflow: hidden;

  img {
    height: 150px;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

export const ProductTextContainer = styled.div`
  background-color: white;
  margin-top: 10px;
  text-align: left;
  padding: 10px;
  border-radius: 15px;
`;

export const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limits text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  height: 45px; /* Adjust as needed */
`;

export const ProductDetails = styled.p`
  font-size: 14px;
  margin: 3px 0;
  color: #555;
`;
