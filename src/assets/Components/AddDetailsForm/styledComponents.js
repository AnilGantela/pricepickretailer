// RetailerForm.styles.js
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #5f5fd4;
  overflow: hidden;
`;

export const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  box-sizing: border-box;
  background-color: #0000c5;
  margin-bottom: 1rem;
`;

export const LogoutButton = styled.button`
  padding: 8px 16px;
  background-color: #fff;
  color: black;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #c92a35;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 64rem;
  background-color: #0000c5;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  height: 90vh;
  overflow-y: auto;

  color: White;
`;

export const UploadSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #e5e7eb;
  border-radius: 0.5rem;
  background-image: ${({ bg }) => (bg ? `url(${bg})` : "none")};
  background-size: cover;
  background-position: center;
  position: relative;
  min-height: 200px;
`;

export const OverlayBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #5f5fd4;
  z-index: 10;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px;
`;

export const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;

  text-align: center;
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  font-weight: 600;

  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  color: #5f5fd4;
  font-weight: 600;
`;

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  background-color: #22c55e;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s;
  margin-top: auto;
  &:hover {
    background-color: #16a34a;
  }
`;
