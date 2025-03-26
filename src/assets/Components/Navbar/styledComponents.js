import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.$bckgroundcolor || "#0000c5"};
  height: 8vh;
  padding: 0px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  & + * {
    margin-top: 8vh;
  }

  @media (max-width: 768px) {
    height: 10vh;
    min-height: 70px;
    padding: 0 16px;
  }
`;

export const Logo = styled.img`
  height: 7.3vh;
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled.li`
  display: inline-block;
  cursor: pointer;
  position: relative;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #4caf50;
  }
`;

export const Wish = styled.p`
  font-size: 18px;
  color: #fff;
`;

/* Dropdown Styles */
export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: block;
  min-width: 150px;
  z-index: 10;
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 10px;
  color: black;
  text-decoration: none;
  &:hover {
    background: #f0f0f0;
  }
`;
