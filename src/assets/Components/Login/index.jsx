import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  MainContainer,
  ParentContainer,
  FormContainer,
  TextContainer,
  StyledForm,
  OtpFormWrapper,
  OtpContainer,
  StyledInput,
  StyledButton,
  SwitchText,
  InputWrapper,
  Label,
} from "./styledComponents";

const Login = () => {
  const [username, setUsername] = useState("");
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpStatus, setOtpStatus] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("pricepicktoken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleSignin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(
      "https://pricepick-1032723282466.us-central1.run.app/retailer/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      }
    );

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setOtpStatus(true);
    } else {
      console.error("Signup failed:", data.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(
      "https://pricepick-1032723282466.us-central1.run.app/retailer/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      setOtpStatus(true);
    } else {
      console.error("Login failed:", data.message);
    }
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      } else if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
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
      ? "https://pricepick-1032723282466.us-central1.run.app/retailer/verify-login-otp"
      : "https://pricepick-1032723282466.us-central1.run.app/retailer/verify-otp";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: otpCode }),
    });

    const data = await response.json();
    setLoading(false);
    if (response.ok) {
      Cookies.set("pricepicktoken", data.token, { expires: 7, secure: true });
      navigate("/");
    } else {
      console.error("OTP verification failed:", data.message);
    }
  };

  return (
    <MainContainer>
      <ParentContainer>
        <img
          key={login ? "login-img" : "signup-img"}
          src={login ? "./Login-amico.png" : "./Sign up-amico.png"}
          alt={login ? "login" : "signup"}
        />
        <FormContainer>
          <TextContent login={login} />
          {otpStatus ? (
            <OtpForm
              otp={otp}
              loading={loading}
              handleOtpChange={handleOtpChange}
              handleOtpSubmit={handleOtpSubmit}
            />
          ) : login ? (
            <LoginForm
              email={email}
              loading={loading}
              onChange={handleInputChange(setEmail)}
              onSubmit={handleLogin}
              onSwitch={() => setLogin(false)}
            />
          ) : (
            <SignupForm
              username={username}
              email={email}
              password={password}
              loading={loading}
              onChangeUsername={handleInputChange(setUsername)}
              onChangeEmail={handleInputChange(setEmail)}
              onChangePassword={handleInputChange(setPassword)}
              onSubmit={handleSignin}
              onSwitch={() => setLogin(true)}
            />
          )}
        </FormContainer>
      </ParentContainer>
    </MainContainer>
  );
};

const TextContent = ({ login }) => (
  <TextContainer key={login ? "login-img" : "signup-img"}>
    <h1>{login ? "Welcome back!" : "Sign In"}</h1>
    <p>
      {login
        ? "Log in to continue your journey with us."
        : "Join us! to start the journey"}
    </p>
  </TextContainer>
);

const OtpForm = ({ otp, loading, handleOtpChange, handleOtpSubmit }) => (
  <OtpFormWrapper onSubmit={handleOtpSubmit}>
    <label>Enter OTP</label>
    <OtpContainer>
      {otp.map((digit, index) => (
        <StyledInput
          key={index}
          id={`otp-input-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleOtpChange(index, e.target.value)}
        />
      ))}
    </OtpContainer>
    <StyledButton type="submit" disabled={loading}>
      {loading ? "Verifying..." : "Submit OTP"}
    </StyledButton>
  </OtpFormWrapper>
);

const LoginForm = ({ email, loading, onChange, onSubmit, onSwitch }) => (
  <StyledForm onSubmit={onSubmit}>
    <InputWrapper>
      <StyledInput
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        value={email}
        onChange={onChange}
        required
      />
      <Label htmlFor="email">Enter your email</Label>
    </InputWrapper>
    <StyledButton type="submit" disabled={loading}>
      {loading ? "Sending OTP..." : "Get OTP"}
    </StyledButton>
    <SwitchText>
      Not a member?{" "}
      <button type="button" onClick={onSwitch}>
        Register
      </button>
    </SwitchText>
  </StyledForm>
);

const SignupForm = ({
  username,
  email,
  password,
  loading,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
  onSubmit,
  onSwitch,
}) => (
  <StyledForm onSubmit={onSubmit}>
    <InputWrapper>
      <StyledInput
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={onChangeUsername}
        required
      />
      <Label htmlFor="username">Username</Label>
    </InputWrapper>
    <InputWrapper>
      <StyledInput
        type="email"
        id="email"
        placeholder="Email address"
        value={email}
        onChange={onChangeEmail}
        required
      />
      <Label htmlFor="email">Email address</Label>
    </InputWrapper>
    <InputWrapper>
      <StyledInput
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
        required
      />
      <Label htmlFor="password">Password</Label>
    </InputWrapper>
    <StyledButton type="submit" disabled={loading}>
      {loading ? "Sending OTP..." : "Get OTP"}
    </StyledButton>
    <SwitchText>
      Already a member?{" "}
      <button type="button" onClick={onSwitch}>
        Login
      </button>
    </SwitchText>
  </StyledForm>
);

export default Login;
