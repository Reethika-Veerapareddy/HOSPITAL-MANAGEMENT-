import React, { useEffect, useState } from "react";
import {
  getBloodRequests,
  createBloodRequest,
  updateBloodRequestStatus,
  deleteBloodRequest,
} from "../../services/bloodRequestService";
import "./EmergencyRequests.css";

export default function EmergencyRequests() {
  const [requests, setRequests] = useState([]);

  const [formData, setFormData] = useState({
    patient_name: "",
    blood_group: "",
    units_required: "",
    priority: "Urgent",
    hospital_name: "Smart Hospital",
    required_time: "",
    contact_number: "",
  });

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getBloodRequests();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createBloodRequest(formData);

      alert("Emergency request created successfully");

      setFormData({
        patient_name: "",
        blood_group: "",
        units_required: "",
        priority: "Urgent",
        hospital_name: "Smart Hospital",
        required_time: "",
        contact_number: "",
      });

      loadRequests();
    } catch (error) {
      alert(error.message);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateBloodRequestStatus(id, status);
      loadRequests();
    } catch (error) {
      alert(error.message);
    }
  };

  const removeRequest = async (id) => {
    if (!window.confirm("Delete this request?")) return;

    try {
      await deleteBloodRequest(id);
      loadRequests();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="emergency-page">
      <div className="emergency-header">
        <h1>🚨 Emergency Blood Requests</h1>
        <p>Create and manage urgent blood requests across the hospital network</p>
      </div>

      <div className="emergency-layout">
        <div className="emergency-form-card">
          <h2>Create Emergency Request</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="patient_name"
              placeholder="Patient Name"
              value={formData.patient_name}
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

            <input
              type="number"
              name="units_required"
              placeholder="Units Required"
              value={formData.units_required}
              onChange={handleChange}
              required
            />

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Urgent</option>
              <option>Critical</option>
              <option>Emergency</option>
            </select>

            <label>Required Before</label>
            <input
              type="datetime-local"
              name="required_time"
              value={formData.required_time}
              onChange={handleChange}
            />

            <input
              type="text"
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
            />

            <button type="submit">
              Create Emergency Request
            </button>
          </form>
        </div>

        <div className="emergency-list-card">
          <h2>Active Emergency Requests</h2>

          {requests.length === 0 ? (
            <p>No emergency requests found.</p>
          ) : (
            requests.map((request) => (
              <div className="request-card" key={request.id}>
                <div className="request-top">
                  <div>
                    <h3>{request.patient_name}</h3>
                    <p>
                      {request.blood_group} • {request.units_required} unit(s)
                    </p>
                  </div>

                  <span className={`priority ${request.priority.toLowerCase()}`}>
                    {request.priority}
                  </span>
                </div>

                <p>
                  <strong>Hospital:</strong> {request.hospital_name}
                </p>
                <p>
                  <strong>Contact:</strong> {request.contact_number}
                </p>
                <p>
                  <strong>Status:</strong> {request.status}
                </p>

                <div className="request-actions">
                  <button
                    className="approve"
                    onClick={() => changeStatus(request.id, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="transit"
                    onClick={() => changeStatus(request.id, "In Transit")}
                  >
                    In Transit
                  </button>

                  <button
                    className="complete"
                    onClick={() => changeStatus(request.id, "Completed")}
                  >
                    Complete
                  </button>

                  <button
                    className="delete"
                    onClick={() => removeRequest(request.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}