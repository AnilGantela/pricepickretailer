import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css"; // Import CSS for styling

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("User");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("pricepicktoken");

      if (!token) {
        setLogin(true);
        return;
      }

      try {
        const url = "https://pricpickbackend.onrender.com/retailer/";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers
          },
        });

        if (response.ok) {
          const data = await response.json(); // ✅ Extract JSON response

          setUsername(data.username);
          setLogin(false);
        } else {
          setLogin(true);
          Cookies.remove("pricepicktoken"); // Clear invalid token
        }
      } catch (error) {
        console.error("Error fetching retailer data:", error);
        setLogin(true);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = () => {
    Cookies.remove("pricepicktoken");
    setLogin(true);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">
        <Link to="/">Hi! {username}</Link>
      </h2>
      <ul className="nav-links">
        <li>
          <Link to="/Details">Details</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/add-product">Add Product</Link>
        </li>
        {login ? (
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
