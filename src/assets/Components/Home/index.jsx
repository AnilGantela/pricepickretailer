import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar";
import About from "../About";
import Footer from "../Footer";
import Dashboard from "../Dashboard";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("pricepicktoken");

    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background: "#f8f9fa",
        }}
      >
        <ThreeDots color="palevioletred" height={80} width={80} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Dashboard />
      <About />
      <Footer />
    </>
  );
};

export default Home;
