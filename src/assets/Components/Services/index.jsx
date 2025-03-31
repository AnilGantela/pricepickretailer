import React, { useState } from "react";
import { FaBars, FaTimes, FaBullhorn } from "react-icons/fa";
import AdvertisementForm from "../AdvertisementForm";
import Navbar from "../Navbar";
import {
  Container,
  Sidebar,
  ToggleButton,
  NavLinks,
  NavItem,
  NavLink,
  Content,
} from "./styledComponents"; // Import styled components

const Service = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleAdSubmit = (images) => {
    console.log("Submitted Images:", images);
    // Send images to backend or store in state
  };

  return (
    <>
      <Navbar />
      <Container>
        {/* Sidebar */}
        <Sidebar $isOpen={isOpen}>
          <ToggleButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </ToggleButton>
          <NavLinks>
            <NavItem>
              <NavLink>
                <FaBullhorn /> <span>Advertisements</span>
              </NavLink>
            </NavItem>
          </NavLinks>
        </Sidebar>

        {/* Main Content */}
        <Content $isOpen={isOpen}>
          <AdvertisementForm onSubmit={handleAdSubmit} />
        </Content>
      </Container>
    </>
  );
};

export default Service;
