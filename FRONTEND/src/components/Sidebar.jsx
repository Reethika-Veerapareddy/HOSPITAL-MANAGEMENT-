import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>🏥 Smart Hospital</h2>
        <p>Management System</p>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/patients">Patients</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/appointments">Appointments</NavLink>
        <NavLink to="/laboratory">Laboratory</NavLink>
        <NavLink to="/pharmacy">Pharmacy</NavLink>
        <NavLink to="/bloodbank">Blood Bank</NavLink>
        <NavLink to="/billing">Billing</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}