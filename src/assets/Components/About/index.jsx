import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Cookies from "js-cookie";

import {
  Loader,
  RetailerDetailsContainer,
  RetailerImageContainer,
  RetailerDetailsTitle,
  RetailerTextContainer,
  RetailerDetailsContainerUp,
} from "./styledComponents";

const RetailerDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    shoptime: "",
  });

  const navigate = useNavigate();
  const token = Cookies.get("pricepicktoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchRetailerDetails();
  }, [token, navigate]);

  // Fetch Retailer Details
  const fetchRetailerDetails = async () => {
    try {
      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/details",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (response.ok && data) {
        Cookies.set("retailerDetails", data);
        console.log(Cookies.get("retailerDetails"));
        setDetails(data);
        setFormData({
          phoneNumber: data.phoneNumber,
          shoptime: data.shoptime,
        });
      } else {
        setDetails(null);
      }
    } catch (error) {
      console.error("Error fetching retailer details:", error);
      setDetails(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Change

  const renderRetailerGrid = () => (
    <RetailerDetailsContainerUp>
      <RetailerDetailsTitle>Details of You</RetailerDetailsTitle>
      <RetailerDetailsContainer>
        <RetailerImageContainer>
          <img src={details.photo} alt="shop Photo" />
        </RetailerImageContainer>
        <RetailerTextContainer>
          <p>
            Retailer: @<span>{details.username}</span>
          </p>
          <p>
            Shop Name: @<span>{details.shopname}</span>
          </p>
          <p>
            Address: {details.address?.street ?? "N/A"},{" "}
            {details.address?.city ?? "N/A"}, {details.address?.state ?? "N/A"}
          </p>
          <p>Email: {details.email}</p>
          <p>Phone: {details.phoneNumber}</p>
          <p>Shop Timing: {details.shoptime}</p>
        </RetailerTextContainer>
      </RetailerDetailsContainer>
    </RetailerDetailsContainerUp>
  );

  return (
    <>
      {loading ? (
        <Loader>
          <ThreeDots color="#5f5fd4" height={80} width={80} />
        </Loader>
      ) : (
        renderRetailerGrid()
      )}
    </>
  );
};

export default RetailerDetails;
