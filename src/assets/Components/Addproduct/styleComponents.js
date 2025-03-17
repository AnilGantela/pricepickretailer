// styledComponents.js

import styled from "styled-components";

// A flex container for layout
export const AddProductContainer = styled.div`
  display: flex;
  width: 100%;
  height: 92.5vh;
  border: 2px solid red;
`;

// A styled heading
export const SearchContainer = styled.div`
  width: 20%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 5px;
  border-right: 2px solid red;
`;

export const ChartConainter = styled.div`
  width: 100%;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 95%;
`;

export const SearchElementConainter = styled.ul`
  width: 95%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchElement = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 97%;
  margin-top: 7px;
  background-color: #fff;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  font-size: 14px;
  margin-left: -2px;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    background-color: #f9f9f9;
    transform: translateY(-2px); /* Lift effect */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const SearchElementInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

export const TitleText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit text to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  font-weight: bold;
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  width: 50%;
  max-width: 600px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  margin: 10px;
  border: none;
`;
export const FormTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Aligns text and messages in the center */
  gap: 10px; /* Adds spacing between the title and messages */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TitleInput = styled.input`
  width: 70%;
`;

export const PriceInput = styled.input`
  width: 25%;
`;

export const StockInput = styled.input`
  width: 20%;
`;
export const DiscountInput = styled.input`
  width: 20%;
`;

export const FormTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
export const FormBottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

export const Select = styled.select`
  width: 50%;
  padding: 5px;
`;

// A reusable button with hover effects
export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// A card component
export const Card = styled.div`
  background: white;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  text-align: center;
`;
