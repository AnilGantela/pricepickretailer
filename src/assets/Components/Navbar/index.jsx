import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {
  NavbarContainer,
  Logo,
  NavLinks,
  NavItem,
  NavLink,
  Wish,
} from "./styledComponents"; // Import styled components

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get("pricepicktoken");

      if (!token) {
        setLogin(true);
        return;
      }

      try {
        const response = await fetch(
          "https://pricepick-1032723282466.us-central1.run.app/retailer",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
          setLogin(false);
        } else {
          setLogin(true);
          Cookies.remove("pricepicktoken");
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
    <NavbarContainer $bckgroundcolor="#0000c5">
      <Link to="/">
        <Logo
          src="https://res.cloudinary.com/dzsgsaxyt/image/upload/v1742669434/retailers/pricepickweblogo.png"
          alt="logo"
        />
      </Link>

      <Wish>Hi! {username}</Wish>
      <NavLinks>
        <NavItem>
          <NavLink as={Link} to="/Details">
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/products">
            Products
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink as={Link} to="/add-product">
            Add Product
          </NavLink>
        </NavItem>
        {login ? (
          <NavItem>
            <NavLink as={Link} to="/login">
              Login
            </NavLink>
          </NavItem>
        ) : (
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;
