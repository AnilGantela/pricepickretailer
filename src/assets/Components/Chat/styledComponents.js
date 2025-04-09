import styled from "styled-components";

export const Container = styled.div`
  width: 400px;
  height: 500px;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: Arial, sans-serif;
  right: 0;
  bottom: 0;
  position: fixed; /* ← fixed typo */
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

export const Header = styled.div`
  background-color: #0000c5;
  color: white;
  padding: 12px 16px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  position: relative;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const Messages = styled.div`
  flex: 1;
  padding: 10px;
  background: #f9f9f9;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  background-color: ${({ sender }) =>
    sender === "user" ? "#d1e7dd" : "#e2e3e5"};
  align-self: ${({ sender }) =>
    sender === "user" ? "flex-end" : "flex-start"};
  border-radius: 10px;
  max-width: 70%;
  min-width: 100px;
  word-wrap: break-word;
  padding-right: 20px;
  text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;
  background: white;
`;

export const TextInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
`;

export const SendButton = styled.button`
  margin-left: 10px;
  padding: 8px 16px;
  background-color: #0000c5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #357ab8;
  }
`;
