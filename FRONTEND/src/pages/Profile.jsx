import '../styles/profile.css';

export default function Profile() {
  return (
    <div className="module-page">
      <div className="profile-card">
        <div className="avatar">A</div>
        <h2>Administrator</h2>
        <p>admin@smarthospital.com</p>

        <div className="profile-info">
          <p><strong>Role:</strong> Admin</p>
          <p><strong>Department:</strong> Administration</p>
          <p><strong>Phone:</strong> +91 9876543210</p>
        </div>
      </div>
    </div>
  );
}