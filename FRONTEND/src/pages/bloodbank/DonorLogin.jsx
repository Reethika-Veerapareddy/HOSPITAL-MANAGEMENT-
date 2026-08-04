import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DonorLogin.css";

export default function DonorLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary demo login
    if (formData.email && formData.password) {
      alert("Donor login successful");
      navigate("/donor-dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="donor-login-page">
      <div className="donor-login-card">
        <div className="donor-header">
          <div className="donor-icon">🩸</div>
          <h1>Blood Donor Portal</h1>
          <p>
            Sign in to receive emergency blood donation requests and manage your
            donor profile.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login to Donor Portal
          </button>
        </form>

        <div className="login-links">
          <Link to="/donor-register">
  Become a New Donor
</Link>

          <Link to="/blood-bank">
            Back to Blood Bank
          </Link>
        </div>

        <div className="donor-features">
          <div className="feature">
            <span>🚨</span>
            <p>Emergency alerts</p>
          </div>

          <div className="feature">
            <span>📍</span>
            <p>Nearby hospital requests</p>
          </div>

          <div className="feature">
            <span>❤️</span>
            <p>Donation history</p>
          </div>
        </div>
      </div>
    </div>
  );
}