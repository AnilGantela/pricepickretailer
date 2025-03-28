import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";
import About from "../About";
import Footer from "../Footer";
import Dashboard from "../Dashboard";
import AddDetailsForm from "../AddDetailsForm";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [detailsAdded, setDetailsAdded] = useState(false);

  useEffect(() => {
    const token = Cookies.get("pricepicktoken");

    if (!token) {
      navigate("/login");
      return;
    }

    const checkRetailerDetails = async () => {
      try {
        const response = await fetch(
          "https://pricepick-1032723282466.us-central1.run.app/retailer/checkDetails",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setDetailsAdded(data.detailsExist); // ✅ Use correct key
        } else {
          setDetailsAdded(false);
        }
      } catch (error) {
        console.error("Error checking retailer details:", error);
        setDetailsAdded(false);
      } finally {
        setLoading(false);
      }
    };

    checkRetailerDetails();
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
        }}
      >
        <ThreeDots color="#5f5fd4" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      {detailsAdded ? (
        <>
          <Navbar />
          <About />
          <Dashboard />
          <Footer />
        </>
      ) : (
        <AddDetailsForm />
      )}
    </>
  );
};

export default Home;
