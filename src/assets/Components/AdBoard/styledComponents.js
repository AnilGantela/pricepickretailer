import styled from "styled-components";

export const AdsContainer = styled.div`
  height: 40vh;
  background-color: white;
  width: 100%;
  margin-bottom: 10px;
`;

export const AdContainer = styled.div`
  background-image: ${({ bgimage }) => (bgimage ? `url(${bgimage})` : "none")};
  background-size: cover;
  width: 100%;
  height: 100%;
  border: 2px solid red;
`;

export const Image = styled.img`
  width: 250px;
  height: 70%;
`;

export const NoAdContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Button Styling
export const Button = styled.button`
  background-color: #5f5fd4;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 16px;
  transition: background 0.3s ease-in-out;

  &:hover {
    background-color: #4949b7;
  }
`;

// Paragraph Styling
export const NoAdsText = styled.p`
  font-size: 30px;
  color: #333;
  margin-top: 10px;
  text-align: center;
  font-weight: 500;
`;
