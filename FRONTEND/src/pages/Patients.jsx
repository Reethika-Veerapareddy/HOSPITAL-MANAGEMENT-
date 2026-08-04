import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
getPatients,
addPatient,
updatePatient,
deletePatient
} from '../services/api';
import '../styles/patients.css';

export default function Patients() {
const navigate = useNavigate();

const emptyForm = {
full_name: '',
date_of_birth: '',
age: '',
gender: '',
blood_group: '',
phone: '',
email: '',
address: '',
city: '',
state: '',
pincode: '',
emergency_contact_name: '',
emergency_contact_phone: '',
department: '',
assigned_doctor: '',
patient_type: 'OP',
allergies: '',
medical_conditions: '',
notes: ''
};

const [patients, setPatients] = useState([]);
const [search, setSearch] = useState('');
const [showModal, setShowModal] = useState(false);
const [editingPatient, setEditingPatient] = useState(null);
const [form, setForm] = useState(emptyForm);

useEffect(() => {
loadPatients();
}, []);

async function loadPatients() {
  try {
    const data = await getPatients();

    if (Array.isArray(data)) {
      setPatients(data);
    } else if (data && Array.isArray(data.patients)) {
      setPatients(data.patients);
    } else {
      setPatients([]);
    }
  } catch (error) {
    console.error('Failed to load patients:', error);
    setPatients([]);
  }
}

function openAddModal() {
setEditingPatient(null);
setForm(emptyForm);
setShowModal(true);
}

function openEditModal(patient) {
setEditingPatient(patient);
setForm({
full_name: patient.full_name || '',
date_of_birth: patient.date_of_birth || '',
age: patient.age || '',
gender: patient.gender || '',
blood_group: patient.blood_group || '',
phone: patient.phone || '',
email: patient.email || '',
address: patient.address || '',
city: patient.city || '',
state: patient.state || '',
pincode: patient.pincode || '',
emergency_contact_name: patient.emergency_contact_name || '',
emergency_contact_phone: patient.emergency_contact_phone || '',
department: patient.department || '',
assigned_doctor: patient.assigned_doctor || '',
patient_type: patient.patient_type || 'OP',
allergies: patient.allergies || '',
medical_conditions: patient.medical_conditions || '',
notes: patient.notes || ''
});
setShowModal(true);
}

async function handleSubmit(e) {
e.preventDefault();

try {
  const payload = {
    ...form,
    age: Number(form.age)
  };

  if (editingPatient) {
    await updatePatient(editingPatient.id, payload);
  } else {
    await addPatient(payload);
  }

  setShowModal(false);
  setEditingPatient(null);
  setForm(emptyForm);

  await loadPatients();
} catch (error) {
  alert(error.message);
}


}

async function handleDelete(id) {
if (!window.confirm('Delete this patient?')) return;


await deletePatient(id);
await loadPatients();


}

const filteredPatients = useMemo(() => {
return patients.filter((patient) => {
const q = search.toLowerCase();


  return (
    (patient.full_name || '').toLowerCase().includes(q) ||
    (patient.patient_id || '').toLowerCase().includes(q) ||
    (patient.phone || '').includes(search)
  );
});


}, [patients, search]);

const totalPatients = patients.length;
const opPatients = patients.filter((p) => p.patient_type === 'OP').length;
const ipPatients = patients.filter((p) => p.patient_type === 'IP').length;
const emergencyPatients = patients.filter((p) => p.patient_type === 'Emergency').length;

function initials(name = '') {
return name
.split(' ')
.map((n) => n[0])
.join('')
.substring(0, 2)
.toUpperCase();
}

return ( <div className="patients-dashboard"> <section className="hero-section"> <div className="hero-content"> <h1>Patient Management System</h1> <p>Complete digital registration and patient record management.</p> </div>

    <button className="primary-btn" onClick={openAddModal}>
      + Register Patient
    </button>
  </section>

  <section className="kpi-grid">
    <div className="kpi-card">
      <span>Total Patients</span>
      <h2>{totalPatients}</h2>
    </div>

    <div className="kpi-card">
      <span>Out Patients</span>
      <h2>{opPatients}</h2>
    </div>

    <div className="kpi-card">
      <span>In Patients</span>
      <h2>{ipPatients}</h2>
    </div>

    <div className="kpi-card">
      <span>Emergency</span>
      <h2>{emergencyPatients}</h2>
    </div>
  </section>

  <section className="search-section">
    <input
      type="text"
      placeholder="Search by patient name, ID, or phone number..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </section>

  <section className="directory-section">
    <div className="section-header">
      <h2>Patient Directory</h2>
      <span>{filteredPatients.length} patients found</span>
    </div>

    <div className="patient-grid">
      {filteredPatients.map((patient) => (
        <div
          key={patient.id}
          className="patient-card"
          onClick={() => navigate(`/patients/${patient.id}`)}
        >
          <div className="patient-card-top">
            <div className="avatar">{initials(patient.full_name)}</div>

            <span className="patient-type">
              {patient.patient_type || 'OP'}
            </span>
          </div>

          <h3>{patient.full_name}</h3>
          <p>{patient.patient_id}</p>

          <div className="patient-meta">
            <div>
              <strong>{patient.age}</strong>
              <span>Age</span>
            </div>

            <div>
              <strong>{patient.gender}</strong>
              <span>Gender</span>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="edit-btn"
              onClick={(e) => {
                e.stopPropagation();
                openEditModal(patient);
              }}
            >
              Edit
            </button>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(patient.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>

  {showModal && (
    <div
      className="modal-overlay"
      onClick={() => setShowModal(false)}
    >
      <div
        className="patient-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            {editingPatient ? 'Edit Patient' : 'Patient Registration'}
          </h2>

          <button onClick={() => setShowModal(false)}>×</button>
        </div>

        <form className="patient-form" onSubmit={handleSubmit}>
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
            type="date"
            value={form.date_of_birth}
            onChange={(e) =>
              setForm({
                ...form,
                date_of_birth: e.target.value
              })
            }
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value
              })
            }
            required
          />

          <select
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender: e.target.value
              })
            }
            required
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input
            placeholder="Blood Group"
            value={form.blood_group}
            onChange={(e) =>
              setForm({
                ...form,
                blood_group: e.target.value
              })
            }
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
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value
              })
            }
          />

          <input
            placeholder="City"
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value
              })
            }
          />

          <input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value
              })
            }
          />

          <input
            placeholder="PIN Code"
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value
              })
            }
          />

          <input
            placeholder="Emergency Contact Name"
            value={form.emergency_contact_name}
            onChange={(e) =>
              setForm({
                ...form,
                emergency_contact_name: e.target.value
              })
            }
          />

          <input
            placeholder="Emergency Contact Phone"
            value={form.emergency_contact_phone}
            onChange={(e) =>
              setForm({
                ...form,
                emergency_contact_phone: e.target.value
              })
            }
          />

          <input
            placeholder="Department"
            value={form.department}
            onChange={(e) =>
              setForm({
                ...form,
                department: e.target.value
              })
            }
          />

          <input
            placeholder="Assigned Doctor"
            value={form.assigned_doctor}
            onChange={(e) =>
              setForm({
                ...form,
                assigned_doctor: e.target.value
              })
            }
          />

          <select
            value={form.patient_type}
            onChange={(e) =>
              setForm({
                ...form,
                patient_type: e.target.value
              })
            }
          >
            <option>OP</option>
            <option>IP</option>
            <option>Emergency</option>
          </select>

          <textarea
            placeholder="Allergies"
            value={form.allergies}
            onChange={(e) =>
              setForm({
                ...form,
                allergies: e.target.value
              })
            }
          />

          <textarea
            placeholder="Medical Conditions"
            value={form.medical_conditions}
            onChange={(e) =>
              setForm({
                ...form,
                medical_conditions: e.target.value
              })
            }
          />

          <textarea
            placeholder="Clinical Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value
              })
            }
          />

          <button type="submit" className="save-btn">
            {editingPatient ? 'Update Patient' : 'Register Patient'}
          </button>
        </form>
      </div>
    </div>
  )}
</div>


);
}
