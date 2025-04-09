import styled from "styled-components";

export const Loader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ChatToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #0000c5;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  z-index: 1001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #357ab8;
  }
`;
