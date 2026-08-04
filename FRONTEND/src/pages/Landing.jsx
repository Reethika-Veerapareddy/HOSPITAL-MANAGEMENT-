import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/landing.css';
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
return ( <div className="landing-page"> <header className="landing-navbar"> <div className="logo"> <h2>🏥 Smart Hospital</h2> </div>


    <nav>
      <a href="#services">Services</a>
      <a href="#blood">Blood Bank</a>
      <a href="#doctors">Doctors</a>
      <a href="#contact">Contact</a>
      <Link to="/login" className="login-btn">Admin Login</Link>
    </nav>
  </header>

  <section className="hero">
    <div className="hero-overlay"></div>

    <div className="hero-content">
      <span className="hero-badge">Advanced Healthcare Platform</span>

      <h1>
        Intelligent Hospital &
        <br />
        Blood Bank Management
      </h1>

      <p>
        Transform healthcare with digital patient records, online
        appointments, laboratory management, pharmacy automation, and
        emergency blood coordination.
      </p>

      <div className="hero-buttons">
        <button className="btn-primary">Book Appointment</button>
        <button className="btn-secondary">Emergency Care</button>
      </div>

      <div className="hero-stats">
        <div className="stat">
          <h2>25K+</h2>
          <span>Patients</span>
        </div>

        <div className="stat">
          <h2>120+</h2>
          <span>Doctors</span>
        </div>

        <div className="stat">
          <h2>24×7</h2>
          <span>Emergency</span>
        </div>
      </div>
    </div>
  </section>

  <section className="services" id="services">
    <div className="section-title">
      <h2>Our Smart Healthcare Services</h2>
      <p>Everything you need in one intelligent hospital platform</p>
    </div>

    <div className="service-grid">
      <div className="service-card">
        <div className="service-icon">🩺</div>
        <h3>Expert Consultation</h3>
        <p>Online appointment scheduling with specialist doctors.</p>
      </div>

      <div className="service-card">
        <div className="service-icon">🧪</div>
        <h3>Laboratory</h3>
        <p>Digital test reports and real-time laboratory management.</p>
      </div>

      <div className="service-card">
        <div className="service-icon">💊</div>
        <h3>Pharmacy</h3>
        <p>Medicine inventory, prescriptions, and billing integration.</p>
      </div>

      <div className="service-card">
        <div className="service-icon">❤️</div>
        <h3>Blood Bank</h3>
        <p>Emergency blood requests and donor management system.</p>
      </div>
    </div>
  </section>

  <section className="blood-banner" id="blood">
    <div className="blood-content">
      <h2>Emergency Blood Bank Network</h2>
      <p>
        Real-time blood inventory monitoring with emergency donor
        coordination and rapid request management.
      </p>

      <div className="blood-buttons">
        <button
  className="request-btn"
  onClick={() => navigate("/blood-requests")}
>
  🩸 Request Blood
</button>
        <button
  className="donor-btn"
  onClick={() => navigate("/donor-login")}
>
  ❤️ Become a Donor
</button>
      </div>
    </div>
  </section>

  <section className="doctors" id="doctors">
    <div className="section-title">
      <h2>Our Medical Specialists</h2>
      <p>Experienced healthcare professionals dedicated to excellence</p>
    </div>

    <div className="doctor-grid">
      <div className="doctor-card">
        <div className="doctor-avatar">👩‍⚕️</div>
        <h3>Dr. Priya Reddy</h3>
        <p>Cardiology</p>
      </div>

      <div className="doctor-card">
        <div className="doctor-avatar">👨‍⚕️</div>
        <h3>Dr. Rahul Sharma</h3>
        <p>Orthopedics</p>
      </div>

      <div className="doctor-card">
        <div className="doctor-avatar">👩‍⚕️</div>
        <h3>Dr. Sneha Patel</h3>
        <p>Neurology</p>
      </div>
    </div>
  </section>

  <section className="cta">
    <h2>Experience Smart Digital Healthcare</h2>
    <p>Book your appointment and manage your healthcare seamlessly.</p>
    <button className="cta-btn">Get Started</button>
  </section>

  <footer className="footer" id="contact">
    <div>
      <h3>Smart Hospital</h3>
      <p>Advanced Healthcare Management System</p>
    </div>

    <div>
      <p>📍 Hyderabad, India</p>
      <p>📞 +91 9876543210</p>
      <p>✉ info@smarthospital.com</p>
    </div>
  </footer>
</div>


);
}

export default Landing;
