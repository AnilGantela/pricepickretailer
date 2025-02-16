import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css"; // Make sure CSS is correctly imported

const Login = () => {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = Cookies.get("pricepicktoken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleSignin = async (event) => {
    event.preventDefault();
    const url = "https://pricpickbackend.onrender.com/retailer/register";

    try {
      console.log("hii");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        setOtpStatus(true);
        console.log("OTP sent successfully");
      } else {
        console.error("Signin failed");
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    const url = "https://pricpickbackend.onrender.com/retailer/login";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpStatus(true);
        console.log("OTP sent successfully");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleOtpSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const otpCode = otp.join("").trim();
    if (!email || otpCode.length !== 6) {
      console.error("Missing email or OTP");
      setLoading(false);
      return;
    }

    const url = login
      ? "https://pricpickbackend.onrender.com/retailer/verify-login-otp"
      : "https://pricpickbackend.onrender.com/retailer/verifyOTP";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("pricepicktoken", data.token);
        navigate("/");
      } else {
        console.error("OTP verification failed:", data.message);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <img
          src="/Product_Quality_And_Why_Does_It_Matter_e8112de20a.webp"
          alt="product"
        />

        <div className="page-login-form">
          {otpStatus ? (
            <form onSubmit={handleOtpSubmit} className="otp-form">
              <label>Enter OTP</label>
              <div className="otp-container">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Submit OTP"}
              </button>
            </form>
          ) : (
            <>
              {login ? (
                <div className="loginForm-container">
                  <h1>Welcome back!</h1>
                  <p>Log in to continue your journey with us.</p>
                  <form onSubmit={handleLogin} className="loginForm">
                    <input
                      name="email"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      required
                    />
                    <button type="submit" disabled={loading}>
                      {loading ? "Sending OTP..." : "Get OTP"}
                    </button>
                  </form>
                  <p>
                    Not a member?{" "}
                    <a
                      onClick={() => setLogin(false)}
                      className="cursor-pointer"
                    >
                      Register
                    </a>
                  </p>
                </div>
              ) : (
                <div className="signin-container">
                  <h1>Welcome!</h1>
                  <p>Join us! to start the journey</p>
                  <form onSubmit={handleSignin}>
                    <input
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={username}
                      onChange={handleInputChange(setUsername)}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address"
                      value={email}
                      onChange={handleInputChange(setEmail)}
                      required
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={handleInputChange(setPassword)}
                      required
                    />
                    <button type="submit">Sign in</button>
                  </form>
                  <p>
                    Already a member?{" "}
                    <a
                      onClick={() => setLogin(true)}
                      className="cursor-pointer"
                    >
                      Login
                    </a>
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
