import '../styles/lab.css';

export default function Laboratory() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Laboratory Management</h1>
        <button>+ Add Test</button>
      </div>

      <div className="module-grid">
        <div className="module-card">
          <h3>Blood Test</h3>
          <p>Completed Today: 42</p>
        </div>

        <div className="module-card">
          <h3>X-Ray</h3>
          <p>Completed Today: 18</p>
        </div>

        <div className="module-card">
          <h3>MRI</h3>
          <p>Completed Today: 6</p>
        </div>
      </div>
    </div>
  );
}