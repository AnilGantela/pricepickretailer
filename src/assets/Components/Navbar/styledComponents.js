import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.$bckgroundcolor};
  height: 7.5vh;
  padding: 0 20px;
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

export const Wish = styled.p`
  font-size: 18px;
  color: #fff;
`;
