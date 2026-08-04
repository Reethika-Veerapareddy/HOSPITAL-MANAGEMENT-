import '../styles/blood.css';

export default function BloodBank() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Blood Bank Management</h1>
        <button>+ Register Donor</button>
      </div>

      <div className="blood-grid">
        <div className="blood-card">
          <h2>A+</h2>
          <p>65 Units</p>
        </div>

        <div className="blood-card">
          <h2>B+</h2>
          <p>42 Units</p>
        </div>

        <div className="blood-card">
          <h2>O+</h2>
          <p>98 Units</p>
        </div>

        <div className="blood-card">
          <h2>AB+</h2>
          <p>18 Units</p>
        </div>
      </div>
    </div>
  );
}