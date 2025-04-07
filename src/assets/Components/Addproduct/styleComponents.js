// styledComponents.js

import styled from "styled-components";

// A flex container for layout
export const AddProductContainer = styled.div`
  display: flex;
  width: 100%;
  height: 92.5vh;
  background-color: #5f5fd4;
`;

export const NextButton = styled.button`
  background-color: #5f5fd4;
  width: 100%;
  height: 40px;

  &:hover {
    background-color: white;
    color: #5f5fd4;
    border: 2px solid #5f5fd4;
  }
`;

// A styled heading
export const SearchContainer = styled.div`
  width: 20%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  margin: 0px 0px 0px 0px;
  background-color: white;
`;

export const ChartConainter = styled.div`
  width: 100%;
  display: flex;
  background-color: white;
`;

export const SearchInput = styled.input`
  width: 95%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
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
  padding-top: 10px;
`;
export const Input = styled.input`
  width: 99%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;
// ✅ Submit Button
export const SubmitButton = styled.button`
  width: 100%;
  background: #0000c5;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
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

// ✅ Glassmorphism Styled Modal
export const GlassModal = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.2); /* Light frosted effect */
  backdrop-filter: blur(10px); /* Blur effect */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin: auto;
`;

// ✅ Close Button (Cross Icon)
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 24px;
  &:hover {
    background-color: transparent;
    color: red;
    transform: translateY(-2px); /* Lift effect */
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  background: white;
  height: 37vh;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  padding: 10px;
  margin: 10px;
  border: none;
`;
export const FormTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  padding: 0px 20px;
  color: #0000c5;
  display: flex;
  justify-content: space-between;
  align-items: center; /* Aligns text and messages in the center */
  gap: 10px; /* Adds spacing between the title and messages */
`;

export const TextArea = styled.textarea`
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 98%;
  resize: none;
`;

export const FormSideContainer = styled.div`
  width: 60%;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 93%;
  gap: 10px;

  padding: 10px;
`;

export const FormTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: first; /* Adjusted spacing */
  align-items: center;
  gap: 10px; /* Add spacing between items */
  padding: 2px;
`;
export const FormBottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: first; /* Adjusted spacing */
  align-items: center;
  gap: 10px; /* Add spacing between items */
  padding: 5px;
`;

export const TitleInput = styled.input`
  width: 70%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
`;

export const PriceInput = styled.input`
  width: 25%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
`;

export const StockInput = styled.input`
  width: 24%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
`;
export const DiscountInput = styled.input`
  width: 24%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
`;

export const Select = styled.select`
  width: 50%;
  border: 1px solid #ccc;
  height: 40px;
  margin-top: 10px;
  padding-left: 5px;
`;

export const ChartContainer = styled.div`
  height: 52vh;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  width: 49%;
`;

export const ChartsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ErrorText = styled.span`
  color: red;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
`;

export const SuccessText = styled.span`
  color: green;
  font-size: 14px;
  display: inline-block;
  margin-left: 10px;
`;
export const PreviewContainer = styled.div`
  width: 100%;
`;

export const PreviewTopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #5f5fd4;
`;

export const PreviewBottomContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  background-color: pink;
  padding: 10px;
`;

export const TopContentContainer = styled.div`
  display: flex;
  width: 100%;
`;
