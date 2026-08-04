import '../styles/navbar.css';

export default function Navbar({ title }) {
  return (
    <header className="navbar">
      <div>
        <h1>{title}</h1>
        <p>Smart Hospital Management System</p>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">🔔</button>
        <div className="admin-profile">
          <div className="admin-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <p>Hospital Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}