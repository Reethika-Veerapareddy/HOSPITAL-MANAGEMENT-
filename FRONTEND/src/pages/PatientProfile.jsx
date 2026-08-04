import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
getPatientById,
updatePatient,
deletePatient
} from '../services/api';
import '../styles/patientProfile.css';

export default function PatientProfile() {
const { id } = useParams();
const navigate = useNavigate();

const [patient, setPatient] = useState(null);
const [showEdit, setShowEdit] = useState(false);
const [form, setForm] = useState(null);

useEffect(() => {
loadPatient();
}, [id]);

async function loadPatient() {
try {
const data = await getPatientById(id);
setPatient(data);
setForm(data);
} catch (error) {
alert('Failed to load patient');
}
}

async function handleUpdate(e) {
e.preventDefault();


try {
  await updatePatient(id, form);
  setShowEdit(false);
  loadPatient();
} catch (error) {
  alert(error.message);
}


}

async function handleDelete() {
if (!window.confirm('Delete this patient?')) return;


await deletePatient(id);
navigate('/patients');


}

function initials(name = '') {
return name
.split(' ')
.map((n) => n[0])
.join('')
.substring(0, 2)
.toUpperCase();
}

if (!patient) {
return ( <div className="profile-loading">
Loading patient profile... </div>
);
}

return ( <div className="patient-profile-page">
<button
className="back-btn"
onClick={() => navigate('/patients')}
>
← Back to Patients </button>


  <section className="profile-header">
    <div className="profile-avatar">
      {initials(patient.full_name)}
    </div>

    <div className="profile-info">
      <h1>{patient.full_name}</h1>
      <p>{patient.patient_id}</p>
      <span className="patient-type">
        {patient.patient_type || 'OP'}
      </span>
    </div>
  </section>

  <section className="summary-grid">
    <div className="summary-card">
      <span>Age</span>
      <h3>{patient.age}</h3>
    </div>

    <div className="summary-card">
      <span>Gender</span>
      <h3>{patient.gender}</h3>
    </div>

    <div className="summary-card">
      <span>Blood Group</span>
      <h3>{patient.blood_group || '-'}</h3>
    </div>

    <div className="summary-card">
      <span>Department</span>
      <h3>{patient.department || '-'}</h3>
    </div>
  </section>

  <section className="details-section">
    <h2>Personal Information</h2>

    <div className="details-grid">
      <div className="detail-card">
        <h4>Full Name</h4>
        <p>{patient.full_name}</p>
      </div>

      <div className="detail-card">
        <h4>Date of Birth</h4>
        <p>{patient.date_of_birth || '-'}</p>
      </div>

      <div className="detail-card">
        <h4>Phone</h4>
        <p>{patient.phone}</p>
      </div>

      <div className="detail-card">
        <h4>Email</h4>
        <p>{patient.email || '-'}</p>
      </div>

      <div className="detail-card full-width">
        <h4>Address</h4>
        <p>{patient.address || '-'}</p>
      </div>
    </div>
  </section>

  <section className="details-section">
    <h2>Emergency Contact</h2>

    <div className="details-grid">
      <div className="detail-card">
        <h4>Name</h4>
        <p>{patient.emergency_contact_name || '-'}</p>
      </div>

      <div className="detail-card">
        <h4>Phone</h4>
        <p>{patient.emergency_contact_phone || '-'}</p>
      </div>
    </div>
  </section>

  <section className="details-section">
    <h2>Medical Information</h2>

    <div className="details-grid">
      <div className="detail-card">
        <h4>Assigned Doctor</h4>
        <p>{patient.assigned_doctor || '-'}</p>
      </div>

      <div className="detail-card">
        <h4>Patient Type</h4>
        <p>{patient.patient_type || 'OP'}</p>
      </div>

      <div className="detail-card full-width">
        <h4>Allergies</h4>
        <p>{patient.allergies || 'None recorded'}</p>
      </div>

      <div className="detail-card full-width">
        <h4>Medical Conditions</h4>
        <p>{patient.medical_conditions || 'None recorded'}</p>
      </div>

      <div className="detail-card full-width">
        <h4>Clinical Notes</h4>
        <p>{patient.notes || 'No clinical notes available.'}</p>
      </div>
    </div>
  </section>

  <section className="action-section">
    <button
      className="edit-profile-btn"
      onClick={() => setShowEdit(true)}
    >
      Edit Patient
    </button>

    <button
      className="delete-profile-btn"
      onClick={handleDelete}
    >
      Delete Patient
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
        <h2>Edit Patient</h2>

        <form onSubmit={handleUpdate}>
          <input
            value={form.full_name || ''}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value
              })
            }
          />

          <input
            type="number"
            value={form.age || ''}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value
              })
            }
          />

          <select
            value={form.gender || ''}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value
              })
            }
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            value={form.phone || ''}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value
              })
            }
          />

          <input
            value={form.email || ''}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <textarea
            value={form.address || ''}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value
              })
            }
          />

          <button type="submit">
            Update Patient
          </button>
        </form>
      </div>
    </div>
  )}
</div>


);
}
