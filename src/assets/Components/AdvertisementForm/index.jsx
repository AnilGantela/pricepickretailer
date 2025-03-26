import React, { useState } from "react";
import {
  FormContainer,
  ImageUploadSection,
  PreviewImage,
  SubmitButton,
} from "./styledComponents";
import {
  NavLinks,
  NavItem,
  NavLink,
  SecondaryNavbarContainer, // New secondary navbar
  MainContainer, // New container for the entire content
  TabContentContainer, // New container for content of each tab
  TabContent, // New styled container for individual tab content
} from "./styledComponents"; // Import Navbar styles
import CampaignCards from "./campaignCards";

const AdvertisementForm = ({ onSubmit }) => {
  const [images, setImages] = useState({
    mobile1: null,
    mobile2: null,
    tablet1: null,
    tablet2: null,
    desktop1: null,
    desktop2: null,
  });

  const [activeNavItem, setActiveNavItem] = useState("New Campaign"); // Active navbar item state

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [key]: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(images); // Pass images to parent component or API
  };

  const handleNavItemClick = (item) => {
    setActiveNavItem(item); // Set the selected item as active
  };

  return (
    <MainContainer>
      <SecondaryNavbarContainer>
        <p>Adverse </p>
        <NavLinks>
          <NavItem>
            <NavLink
              onClick={() => handleNavItemClick("New Campaign")}
              active={activeNavItem === "New Campaign"}
            >
              New Campaign
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => handleNavItemClick("Manage Campaigns")}
              active={activeNavItem === "Manage Campaigns"}
            >
              Manage Campaigns
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => handleNavItemClick("View Analytics")}
              active={activeNavItem === "View Analytics"}
            >
              View Analytics
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => handleNavItemClick("Support")}
              active={activeNavItem === "Support"}
            >
              Support
            </NavLink>
          </NavItem>
        </NavLinks>
      </SecondaryNavbarContainer>

      {/* Tab Content Section */}
      <TabContentContainer>
        {activeNavItem === "New Campaign" && (
          <TabContent>
            <h3>New Campaign</h3>

            <p>
              This section allows you to create a new advertisement campaign.
            </p>
            <CampaignCards />
          </TabContent>
        )}
        {/* Advertisement Form */}
        {/*      <FormContainer onSubmit={handleSubmit}>
              <h2>Upload Advertisement Images</h2>
              <ImageUploadSection>
                {Object.keys(images).map((key) => (
                  <div key={key}>
                    <label>{key.toUpperCase()}</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, key)}
                    />
                    {images[key] && (
                      <PreviewImage src={images[key]} alt={`${key} preview`} />
                    )}
                  </div>
                ))}
              </ImageUploadSection>
              <SubmitButton type="submit">Submit</SubmitButton>
            </FormContainer>*/}
        {/* Add more content related to 'New Campaign' here */}
        {activeNavItem === "Manage Campaigns" && (
          <TabContent>
            <h3>Manage Campaigns</h3>
            <p>
              Here, you can manage your ongoing campaigns, edit details, and
              track performance.
            </p>
            {/* Add more content related to 'Manage Campaigns' here */}
          </TabContent>
        )}
        {activeNavItem === "View Analytics" && (
          <TabContent>
            <h3>View Analytics</h3>
            <p>
              Track the performance and success of your campaigns through
              detailed analytics.
            </p>
            {/* Add more content related to 'View Analytics' here */}
          </TabContent>
        )}
        {activeNavItem === "Support" && (
          <TabContent>
            <h3>Support</h3>
            <p>
              If you need help or have any questions, visit this section for
              support resources.
            </p>
            {/* Add more content related to 'Support' here */}
          </TabContent>
        )}
      </TabContentContainer>
    </MainContainer>
  );
};

export default AdvertisementForm;
