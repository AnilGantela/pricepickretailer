import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.bckgroundcolor};
  height: 7.5vh;
  padding: 0 20px;
`;

export const Logo = styled.h2`
  color: #fff;
  font-size: 24px;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;
  }
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const NavItem = styled.li`
  display: inline;
`;

export const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s;

  &:hover {
    color: #4caf50;
  }
`;

export const LogoutButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #4caf50;
  }
`;
