import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import Cookies from "js-cookie";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AdContainer,
  AdsContainer,
  Image,
  NoAdContainer,
  Loader,
  Button,
  NoAdsText,
} from "./styledComponents";
import { ThreeDots } from "react-loader-spinner";

const AdsCarousel = () => {
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigation function

  const fetchAds = async () => {
    try {
      const token = Cookies.get("pricepicktoken");

      if (!token) {
        console.error("Authentication token is missing.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://pricepick-1032723282466.us-central1.run.app/retailer/ads",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setProductImages(data.ads || []);
      } else {
        console.error("Failed to fetch ads:", data);
      }
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <AdsContainer>
      {loading ? (
        <NoAdContainer>
          <Loader>
            <ThreeDots color="#5f5fd4" height={80} width={80} />
          </Loader>
        </NoAdContainer>
      ) : productImages.length > 0 ? (
        <Slider {...settings}>
          {productImages.map((image, index) => (
            <AdContainer $bgimage={image} key={index} />
          ))}
        </Slider>
      ) : (
        <NoAdContainer>
          <Image src="Online ads-amico.png" alt="No Ads Available" />
          <div>
            <NoAdsText>
              "Advertise here and let your brand speak for itself!"
            </NoAdsText>
            <Button onClick={() => navigate("/services")}>check </Button>
          </div>
        </NoAdContainer>
      )}
    </AdsContainer>
  );
};

export default AdsCarousel;
