import styled from "styled-components";

export const ProductCardContainer = styled.li`
  width: 100%;
  display: flex;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #ccc;
  position: relative;
  height: 350px;
`;

export const ProductLeftContainer = styled.div`
  width: 70%;
`;

export const ProductDescriptionContainer = styled.div`
  height: 40%;
  text-align: left;
  font-size: 10px;
  overflow: none;
  padding: 10px;
  background-color: white;
`;

export const CarouselContainer = styled.div`
  width: 100%;
  height: 60%;
  background-color: white;
  overflow: hidden;
  img {
    height: 170px;
    width: 100%;
    object-fit: contain;
    border-radius: 10px;
  }
`;

export const ProductTextContainer = styled.div`
  background-color: white;
  text-align: left;
  padding: 10px;
  width: 50%;
`;

export const ProductTitle = styled.h2`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limits text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

export const ProductDetails = styled.p`
  font-size: 14px;
  color: #555;
  background-color: white;
`;

export const ProductDescription = styled.p`
  height: 100%;
  font-size: 12px;
  color: #555;

  display: -webkit-box;
  -webkit-line-clamp: 10; /* Limits text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;
