import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import '../styles/login.css';

export default function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);

async function handleLogin(e) {
e.preventDefault();
setLoading(true);


try {
  const data = await loginUser({ email, password });

  if (data.access_token) {
    localStorage.setItem('token', data.access_token);

    if (data.user) {
      localStorage.setItem('user', JSON.stringify(data.user));
    }

    navigate('/dashboard');
  } else {
    alert(data.message || 'Invalid email or password');
  }
} catch (error) {
  console.error(error);
  alert('Unable to connect to the server');
} finally {
  setLoading(false);
}


}

return ( <div className="login-page"> <div className="login-background"> <div className="bg-circle circle-1"></div> <div className="bg-circle circle-2"></div> <div className="bg-circle circle-3"></div> </div>

  <div className="login-container">
    <div className="login-left">
      <div className="brand-badge">Smart Hospital</div>

      <h1>Hospital Command Center</h1>

      <p>
        Secure administrative access to patient records, appointments,
        blood bank operations, laboratory reports, pharmacy, and
        hospital analytics.
      </p>

      <div className="feature-list">
        <div className="feature-item">
          <span>🩺</span>
          <div>
            <h4>Patient management</h4>
            <p>Complete digital patient records</p>
          </div>
        </div>

        <div className="feature-item">
          <span>🩸</span>
          <div>
            <h4>Blood bank network</h4>
            <p>Real-time emergency coordination</p>
          </div>
        </div>

        <div className="feature-item">
          <span>📊</span>
          <div>
            <h4>Hospital analytics</h4>
            <p>Live operational insights and reports</p>
          </div>
        </div>
      </div>

      <div className="status-card">
        <div className="status-dot"></div>
        <div>
          <strong>System operational</strong>
          <p>All hospital services are online</p>
        </div>
      </div>
    </div>

    <div className="login-right">
      <div className="login-card">
        <div className="login-icon">🏥</div>

        <h2>Administrator Login</h2>
        <p>Sign in to access the Smart Hospital dashboard</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email address</label>
            <input
              type="email"
              placeholder="admin@smarthospital.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="login-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Access Command Center'}
          </button>
        </form>

        <div className="login-footer">
          <a href="#">Forgot password?</a>
        </div>
      </div>
    </div>
  </div>
</div>


);
}
