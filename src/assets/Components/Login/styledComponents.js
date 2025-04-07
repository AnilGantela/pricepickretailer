import styled, { keyframes } from "styled-components";

// Slide-in from left animation
const slideInFromLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Slide-in from top animation
const slideInFromTop = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MainContainer = styled.div`
  background-color: #000c5;
  display: flex;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const ParentContainer = styled.div`
  background-color: white;
  height: 90vh;
  width: 95%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  img {
    width: 500px;
    height: 500px;
    opacity: 0;
    animation: ${slideInFromLeft} 2s ease-out forwards;
  }
`;

export const FormContainer = styled.div`
  background-color: white;
  height: 100%;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const TextContainer = styled.div`
  height: 200px;
  h1 {
    font-size: 90px;
    font-weight: 900;
    animation: ${slideInFromTop} 2s ease-out forwards;
    color: #5151b4;
  }

  p {
    font-size: 18px;
    color: #666;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
`;

export const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  position: relative;
  z-index: 1;
  background-color: transparent;
  width: 60%;
  margin-right: 10px;

  &::placeholder {
    color: transparent;
  }

  &:focus {
    border-color: #5151b4;
  }

  &:focus + label,
  &:not(:placeholder-shown) + label {
    top: -20px;
    font-size: 12px;
    color: #5151b4;
    position: absolute;
    left: 10px;
    background-color: white;
  }
`;

export const Label = styled.label`
  font-size: 16px;
  color: #aaa;
  position: absolute;
  top: 10px;
  left: 10px;
  transition: all 0.3s ease;
  pointer-events: none;
`;

export const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #5151b4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;

  width: 60%;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const OtpFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const OtpContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;

export const SwitchText = styled.p`
  font-size: 16px;

  button {
    background: none;
    border: none;
    color: #5151b4;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
