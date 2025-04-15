import React, { useState } from "react";
import Cookies from "js-cookie";
import {
  Container,
  Wrapper,
  UploadSection,
  OverlayBox,
  FormSection,
  Title,
  Label,
  Input,
  GridRow,
  Button,
  TopBar,
  LogoutButton,
} from "./styledComponents.js";

const RetailerForm = () => {
  const [formData, setFormData] = useState({
    photo: "",
    shopname: "",
    phoneNumber: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
    shoptime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    Cookies.remove("pricepicktoken");
    alert("You have been logged out.");
    window.location.href = "/"; // Adjust route if needed
  };

  const handleFormData = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("pricepicktoken");

      if (!token) {
        alert("Authentication token is missing. Please log in.");
        return;
      }

      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/add-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Retailer details submitted successfully!");

        setFormData({
          photo: "",
          shopname: "",
          phoneNumber: "",
          street: "",
          pincode: "",
          city: "",
          state: "",
          shoptime: "",
        });

        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        console.error("Server Error:", data);
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Container>
      <TopBar>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </TopBar>

      <Wrapper>
        {/* Image Upload Section */}
        <UploadSection bg={formData.photo}>
          <OverlayBox>
            <Label>
              Upload Photo: <span style={{ color: "red" }}>100kb</span>
            </Label>
          </OverlayBox>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  console.log(
                    "Converted Image Data:",
                    reader.result.substring(0, 100)
                  );
                  setFormData((prev) => ({
                    ...prev,
                    photo: reader.result,
                  }));
                };
                reader.readAsDataURL(file);
              }
            }}
            style={{ zIndex: 10 }}
          />
        </UploadSection>

        {/* Form Fields Section */}
        <FormSection>
          <Title>Update Retailer Details</Title>

          <div>
            <Label>Shop Name:</Label>
            <Input
              type="text"
              name="shopname"
              onChange={handleChange}
              value={formData.shopname}
            />
          </div>

          <div>
            <Label>Phone Number:</Label>
            <Input
              type="text"
              name="phoneNumber"
              onChange={handleChange}
              value={formData.phoneNumber}
              required
            />
          </div>

          <div>
            <Label>Street:</Label>
            <Input
              type="text"
              name="street"
              onChange={handleChange}
              value={formData.street}
              required
            />
          </div>

          <GridRow>
            <div>
              <Label>Pincode:</Label>
              <Input
                type="text"
                name="pincode"
                onChange={handleChange}
                value={formData.pincode}
                required
              />
            </div>

            <div>
              <Label>City:</Label>
              <Input
                type="text"
                name="city"
                onChange={handleChange}
                value={formData.city}
                required
              />
            </div>
          </GridRow>

          <div>
            <Label>State:</Label>
            <Input
              type="text"
              name="state"
              onChange={handleChange}
              value={formData.state}
              required
            />
          </div>

          <div>
            <Label>Shop Time:</Label>
            <Input
              type="text"
              name="shoptime"
              onChange={handleChange}
              value={formData.shoptime}
              required
            />
          </div>

          <Button type="submit" onClick={handleFormData}>
            Submit
          </Button>
        </FormSection>
      </Wrapper>
    </Container>
  );
};

export default RetailerForm;
