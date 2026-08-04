import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
getDoctorById,
updateDoctor,
deleteDoctor
} from '../services/api';
import '../styles/DoctorProfile.css';

export default function DoctorProfile() {
const { id } = useParams();
const navigate = useNavigate();

const [doctor, setDoctor] = useState(null);
const [showEdit, setShowEdit] = useState(false);
const [form, setForm] = useState(null);

useEffect(() => {
loadDoctor();
}, [id]);

async function loadDoctor() {
const data = await getDoctorById(id);
setDoctor(data);
setForm(data);
}

async function handleUpdate(e) {
e.preventDefault();

await updateDoctor(id, form);

setShowEdit(false);
loadDoctor();


}

async function handleDelete() {
if (!window.confirm('Delete this doctor?')) return;


await deleteDoctor(id);
navigate('/doctors');


}

function initials(name) {
return name
.split(' ')
.map((n) => n[0])
.join('')
.substring(0, 2)
.toUpperCase();
}

if (!doctor) {
return ( <div className="profile-loading">
Loading doctor profile... </div>
);
}

return ( <div className="doctor-profile-page"> <div className="profile-overlay">
<button
className="back-btn"
onClick={() => navigate('/doctors')}
>
← Back to Doctors </button>

```
    <section className="profile-header">
      <div className="profile-avatar">
        {initials(doctor.full_name)}
      </div>

      <div className="profile-info">
        <h1>{doctor.full_name}</h1>

        <p>{doctor.specialization}</p>

        <span
          className={`availability-badge ${
            doctor.availability === 'Available'
              ? 'available'
              : doctor.availability === 'Busy'
              ? 'busy'
              : 'leave'
          }`}
        >
          {doctor.availability}
        </span>
      </div>
    </section>

    <section className="qualification-section">
      <h2>Qualification</h2>
      <p>{doctor.qualification}</p>
    </section>

    <section className="analytics-section">
      <h2>Doctor Analytics</h2>

      <div className="analytics-grid">
        <div className="analytics-card">
          <span>Patients Treated</span>
          <h3>428</h3>
          <p>+12 this week</p>
        </div>

        <div className="analytics-card">
          <span>Appointments Today</span>
          <h3>14</h3>
          <p>3 completed</p>
        </div>

        <div className="analytics-card">
          <span>Rating</span>
          <h3>4.9★</h3>
          <p>Excellent performance</p>
        </div>

        <div className="analytics-card">
          <span>Revenue This Month</span>
          <h3>₹1,84,000</h3>
          <p>+18% growth</p>
        </div>
      </div>
    </section>

    <section className="schedule-section">
      <h2>Weekly Availability</h2>

      <div className="schedule-card">
        <div className="schedule-row">
          <span>Monday</span>
          <div className="time-slot">
            09:00 AM - 05:00 PM
          </div>
        </div>

        <div className="schedule-row">
          <span>Tuesday</span>
          <div className="time-slot">
            09:00 AM - 05:00 PM
          </div>
        </div>

        <div className="schedule-row">
          <span>Wednesday</span>
          <div className="time-slot active">
            09:00 AM - 01:00 PM
          </div>
        </div>

        <div className="schedule-row">
          <span>Thursday</span>
          <div className="time-slot">
            09:00 AM - 05:00 PM
          </div>
        </div>

        <div className="schedule-row">
          <span>Friday</span>
          <div className="time-slot">
            09:00 AM - 05:00 PM
          </div>
        </div>
      </div>
    </section>

    <section className="details-section">
      <h2>Professional Information</h2>

      <div className="details-grid">
        <div className="detail-card">
          <h4>Experience</h4>
          <p>{doctor.experience} years</p>
        </div>

        <div className="detail-card">
          <h4>Phone</h4>
          <p>{doctor.phone}</p>
        </div>

        <div className="detail-card">
          <h4>Email</h4>
          <p>{doctor.email}</p>
        </div>

        <div className="detail-card">
          <h4>Consultation Fee</h4>
          <p>₹{doctor.consultation_fee}</p>
        </div>

        <div className="detail-card">
          <h4>Doctor ID</h4>
          <p>{doctor.doctor_id}</p>
        </div>

        <div className="detail-card">
          <h4>Availability</h4>
          <p>{doctor.availability}</p>
        </div>
      </div>
    </section>

    <section className="action-section">
      <button
        className="edit-profile-btn"
        onClick={() => setShowEdit(true)}
      >
        Edit Profile
      </button>

      <button
        className="delete-profile-btn"
        onClick={handleDelete}
      >
        Delete Doctor
      </button>
    </section>

    {showEdit && form && (
      <div
        className="modal-overlay"
        onClick={() => setShowEdit(false)}
      >
        <div
          className="edit-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Edit Doctor Profile</h2>

          <form onSubmit={handleUpdate}>
            <input
              value={form.full_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  full_name: e.target.value
                })
              }
            />

            <input
              value={form.specialization}
              onChange={(e) =>
                setForm({
                  ...form,
                  specialization: e.target.value
                })
              }
            />

            <input
              value={form.qualification}
              onChange={(e) =>
                setForm({
                  ...form,
                  qualification: e.target.value
                })
              }
            />

            <input
              type="number"
              value={form.experience}
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: e.target.value
                })
              }
            />

            <input
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value
                })
              }
            />

            <input
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />

            <input
              type="number"
              value={form.consultation_fee}
              onChange={(e) =>
                setForm({
                  ...form,
                  consultation_fee: e.target.value
                })
              }
            />

            <select
              value={form.availability}
              onChange={(e) =>
                setForm({
                  ...form,
                  availability: e.target.value
                })
              }
            >
              <option>Available</option>
              <option>Busy</option>
              <option>On Leave</option>
            </select>

            <button type="submit">
              Update Doctor
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
</div>


);
}
