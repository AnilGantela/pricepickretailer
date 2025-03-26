import styled from "styled-components";
export const Container = styled.div`
  display: flex;
`;

export const Sidebar = styled.div`
  width: ${(props) => (props.$isOpen ? "220px" : "60px")};
  height: 92vh;
  background-color: #5f5fd4;
  color: white;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-left: 15px;
  align-self: flex-start;
`;

export const NavLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 5px;
`;

export const NavItem = styled.li`
  padding: 15px;
`;

export const NavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 18px;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    text-decoration: underline;
  }
`;

export const Content = styled.div`
  margin-left: ${(props) => (props.$isOpen ? "220px" : "60px")};
  width: 100%;
  transition: margin-left 0.3s;
  background-color: white;
`;
