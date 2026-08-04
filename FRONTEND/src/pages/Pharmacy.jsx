import '../styles/pharm.css';

export default function Pharmacy() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Pharmacy Management</h1>
        <button>+ Add Medicine</button>
      </div>

      <table className="module-table">
        <thead>
          <tr>
            <th>Medicine</th>
            <th>Stock</th>
            <th>Expiry</th>
            <th>Supplier</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Paracetamol</td>
            <td>520</td>
            <td>12/2027</td>
            <td>ABC Pharma</td>
          </tr>

          <tr>
            <td>Amoxicillin</td>
            <td>180</td>
            <td>08/2027</td>
            <td>MediCare Ltd</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}