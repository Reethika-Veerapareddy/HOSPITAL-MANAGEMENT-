import '../styles/bill.css';

export default function Billing() {
  return (
    <div className="module-page">
      <div className="module-header">
        <h1>Billing & Payments</h1>
        <button>+ Generate Bill</button>
      </div>

      <table className="module-table">
        <thead>
          <tr>
            <th>Bill No</th>
            <th>Patient</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>B1024</td>
            <td>Rahul Kumar</td>
            <td>₹12,500</td>
            <td>Paid</td>
          </tr>

          <tr>
            <td>B1025</td>
            <td>Anjali Sharma</td>
            <td>₹8,200</td>
            <td>Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}