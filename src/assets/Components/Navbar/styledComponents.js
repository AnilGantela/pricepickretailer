import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.$bckgroundcolor || "#0000c5"}; /* Default color */
  height: 8vh;
  padding: 0px 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensures it stays on top */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  /* Ensure it does not collapse */
  min-height: 60px; /* Ensures visibility even if vh fails */

  /* Prevent content from overlapping navbar */
  & + * {
    margin-top: 8vh; /* Pushes the next element down */
  }

  /* Mobile Responsive */
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
