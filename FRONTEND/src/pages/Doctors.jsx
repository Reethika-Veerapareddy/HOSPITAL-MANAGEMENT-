import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors, addDoctor } from '../services/api';
import '../styles/doctors.css';

export default function Doctors() {
const navigate = useNavigate();

const [doctors, setDoctors] = useState([]);
const [search, setSearch] = useState('');
const [showModal, setShowModal] = useState(false);
const [loading, setLoading] = useState(true);

const [form, setForm] = useState({
doctor_id: '',
full_name: '',
specialization: '',
qualification: '',
experience: '',
phone: '',
email: '',
consultation_fee: '',
availability: 'Available'
});

useEffect(() => {
loadDoctors();
}, []);

async function loadDoctors() {
try {
setLoading(true);
const data = await getDoctors();
setDoctors(Array.isArray(data) ? data : []);
} catch (error) {
console.error(error);
alert('Failed to load doctors');
} finally {
setLoading(false);
}
}

async function handleSubmit(e) {
e.preventDefault();


try {
  const result = await addDoctor({
    ...form,
    experience: Number(form.experience),
    consultation_fee: Number(form.consultation_fee)
  });

  setShowModal(false);

  setForm({
    doctor_id: '',
    full_name: '',
    specialization: '',
    qualification: '',
    experience: '',
    phone: '',
    email: '',
    consultation_fee: '',
    availability: 'Available'
  });

  await loadDoctors();

  if (result.doctor && result.doctor.id) {
    navigate(`/doctors/${result.doctor.id}`);
  }

} catch (error) {
  alert(error.message);
}


}

const filteredDoctors = useMemo(() => {
return doctors.filter((doctor) => {
const q = search.toLowerCase();


  return (
    doctor.full_name.toLowerCase().includes(q) ||
    doctor.specialization.toLowerCase().includes(q)
  );
});


}, [doctors, search]);

const totalDoctors = doctors.length;

const availableDoctors = doctors.filter(
(d) => d.availability === 'Available'
).length;

const specializations = new Set(
doctors.map((d) => d.specialization)
).size;

const averageFee =
doctors.length > 0
? Math.round(
doctors.reduce(
(sum, d) => sum + Number(d.consultation_fee || 0),
0
) / doctors.length
)
: 0;

function initials(name) {
return name
.split(' ')
.map((n) => n[0])
.join('')
.substring(0, 2)
.toUpperCase();
}

return ( <div className="doctors-dashboard"> <section className="hero-section"> <div className="hero-content"> <h1>Doctor Management Portal</h1> <p>
Search, manage, and monitor hospital specialists from one
intelligent dashboard. </p>


      <div className="hero-buttons">
        <button
          className="primary-btn"
          onClick={() => setShowModal(true)}
        >
          Add New Doctor
        </button>

        <button className="secondary-btn">
          View All Doctors
        </button>
      </div>
    </div>

    <div className="hero-graphic">
      <div className="circle one"></div>
      <div className="circle two"></div>
      <div className="circle three"></div>
    </div>
  </section>

  <section className="kpi-grid">
    <div className="kpi-card">
      <span>Total Doctors</span>
      <h2>{totalDoctors}</h2>
      <p>Registered in database</p>
    </div>

    <div className="kpi-card">
      <span>Available Today</span>
      <h2>{availableDoctors}</h2>
      <p>Ready for appointments</p>
    </div>

    <div className="kpi-card">
      <span>Specializations</span>
      <h2>{specializations}</h2>
      <p>Across all departments</p>
    </div>

    <div className="kpi-card">
      <span>Average Fee</span>
      <h2>₹{averageFee}</h2>
      <p>Consultation average</p>
    </div>
  </section>

  <section className="search-section">
    <div className="search-box">
      <input
        type="text"
        placeholder="Search doctors by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <div className="search-count">
      {filteredDoctors.length} doctors found
    </div>
  </section>

  <section className="directory-section">
    <div className="section-header">
      <h2>Doctor Directory</h2>
      <span>Click a doctor to open the full profile</span>
    </div>

    {loading ? (
      <div className="loading-state">
        Loading doctors...
      </div>
    ) : filteredDoctors.length === 0 ? (
      <div className="empty-state">
        <h3>No doctors found</h3>
        <p>Add a doctor or change the search term.</p>
      </div>
    ) : (
      <div className="doctor-grid">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="doctor-card"
            onClick={() =>
              navigate(`/doctors/${doctor.id}`)
            }
          >
            <div className="doctor-card-top">
              <div className="avatar">
                {initials(doctor.full_name)}
              </div>

              <span
                className={`status ${
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

            <h3>{doctor.full_name}</h3>

            <p className="specialization">
              {doctor.specialization}
            </p>

            <div className="meta">
              <div>
                <strong>{doctor.experience}</strong>
                <span>Years</span>
              </div>

              <div>
                <strong>₹{doctor.consultation_fee}</strong>
                <span>Fee</span>
              </div>
            </div>

            <button
              className="profile-btn"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/doctors/${doctor.id}`);
              }}
            >
              View Full Profile
            </button>
          </div>
        ))}
      </div>
    )}
  </section>

  {showModal && (
    <div
      className="modal-overlay"
      onClick={() => setShowModal(false)}
    >
      <div
        className="doctor-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>Add New Doctor</h2>

          <button
            onClick={() => setShowModal(false)}
          >
            ×
          </button>
        </div>

        <form
          className="doctor-form"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Doctor ID"
            value={form.doctor_id}
            onChange={(e) =>
              setForm({
                ...form,
                doctor_id: e.target.value
              })
            }
            required
          />

          <input
            placeholder="Full Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value
              })
            }
            required
          />

          <input
            placeholder="Specialization"
            value={form.specialization}
            onChange={(e) =>
              setForm({
                ...form,
                specialization: e.target.value
              })
            }
            required
          />

          <input
            placeholder="Qualification"
            value={form.qualification}
            onChange={(e) =>
              setForm({
                ...form,
                qualification: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Experience (Years)"
            value={form.experience}
            onChange={(e) =>
              setForm({
                ...form,
                experience: e.target.value
              })
            }
            required
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
            }
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Consultation Fee"
            value={form.consultation_fee}
            onChange={(e) =>
              setForm({
                ...form,
                consultation_fee: e.target.value
              })
            }
            required
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

          <button
            type="submit"
            className="save-btn"
          >
            Save Doctor
          </button>
        </form>
      </div>
    </div>
  )}
</div>


);
}
