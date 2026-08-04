import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./DonorRegister.css";

export default function DonorRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    blood_group: "",
    gender: "",
    age: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    last_donation: "",
    available: true,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API call will be added later
    alert("Donor registered successfully!");

    navigate("/donor-login");
  };

  return (
    <div className="donor-register-page">
      <div className="donor-register-card">
        <h1>❤️ Become a Blood Donor</h1>
        <p>Join the Smart Blood Donor Network and help save lives.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />

          <select
            name="blood_group"
            value={formData.blood_group}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>O+</option>
            <option>O-</option>
            <option>AB+</option>
            <option>AB-</option>
          </select>

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
          />

          <label>Last Donation Date</label>
          <input
            type="date"
            name="last_donation"
            value={formData.last_donation}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
            />
            I am available for emergency blood donation
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register as Donor</button>
        </form>

        <p className="login-link">
          Already registered? <Link to="/donor-login">Login here</Link>
        </p>
      </div>
    </div>
  );
}