import styled from "styled-components";

// Main container for the entire page
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  background-color: #f4f4f4;
  height: 92vh;
`;

// Secondary Navbar styles
export const SecondaryNavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #444444;
  height: 6vh;
  padding: 0 20px;
  width: 100%;
  z-index: 999;
  align-items: center;
  color: white;

  /* Mobile Responsive */
  @media (max-width: 768px) {
    height: 8vh;
  }
`;

export const NavLinks = styled.ul`
  list-style: none;
  display: flex;
  gap: 20px;
  align-items: center;
  margin: 0;
`;

export const NavItem = styled.li`
  display: inline;
`;

export const NavLink = styled.a`
  color: ${(props) =>
    props.active ? "#5f5fd4" : "white"}; /* Change color when active */
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;

  &:hover {
    color: #5f5fd4; /* Hover effect */
  }
`;

// New container for tab content
export const TabContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
`;

export const TabContent = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

// Form Container and other components styles (unchanged)
export const FormContainer = styled.form`
  padding: 20px;
`;

export const ImageUploadSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
