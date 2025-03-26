import styled from "styled-components";

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5fd4;
  border: 2px solid red;
`;

export const RetailerDetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  align-items: center;
  background: #f9f9f9;
  border-top: 2px solid #0000c5;
  max-width: 400px;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 600px;
    text-align: left;
  }
`;

export const RetailerImageContainer = styled.div`
  width: 120px;
  height: 100%;

  border: 3px solid #0000c5;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 768px) {
    margin-right: 20px;
    margin-bottom: 0;
  }
`;

export const RetailerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  color: #333;

  p {
    margin: 0;
    font-weight: 500;
  }

  span:first-child {
    font-size: 18px;
    font-weight: bold;
    color: #0000c5;
  }

  p:last-child {
    font-style: italic;
    color: #555;
  }
`;

export const RetailerDetailsTitle = styled.p``;

export const RetailerDetailsContainerUp = styled.div`
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    max-width: 600px;
    text-align: left;
  }
`;
