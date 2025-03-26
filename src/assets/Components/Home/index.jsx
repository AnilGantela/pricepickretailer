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
      <div style={{}}>
        <ThreeDots color="#5f5fd4" height={80} width={80} />
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
