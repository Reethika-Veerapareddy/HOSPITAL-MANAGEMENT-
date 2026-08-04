import React, { useEffect, useState } from 'react';
import {
getAppointments,
addAppointment,
deleteAppointment,
getPatients,
getDoctors
} from '../services/api';
import '../styles/appointments.css';

export default function Appointments() {
const [appointments, setAppointments] = useState([]);
const [patients, setPatients] = useState([]);
const [doctors, setDoctors] = useState([]);
const [selectedAppointment, setSelectedAppointment] = useState(null);

const [form, setForm] = useState({
appointment_id: '',
patient_id: '',
doctor_id: '',
appointment_date: '',
appointment_time: '',
status: 'Confirmed',
notes: ''
});

useEffect(() => {
loadData();
}, []);

async function loadData() {
const [a, p, d] = await Promise.all([
getAppointments(),
getPatients(),
getDoctors()
]);


const list = Array.isArray(a) ? a : [];

setAppointments(list);
setPatients(Array.isArray(p) ? p : []);
setDoctors(Array.isArray(d) ? d : []);

if (list.length > 0) {
  setSelectedAppointment(list[0]);
}


}

async function handleSubmit(e) {
e.preventDefault();


const result = await addAppointment({
  ...form,
  patient_id: Number(form.patient_id),
  doctor_id: Number(form.doctor_id)
});

if (result.message === 'Doctor already has an appointment at this time') {
  alert(result.message);
  return;
}

await loadData();

setForm({
  appointment_id: '',
  patient_id: '',
  doctor_id: '',
  appointment_date: '',
  appointment_time: '',
  status: 'Confirmed',
  notes: ''
});


}

async function handleDelete(id) {
if (!window.confirm('Delete this appointment?')) return;


await deleteAppointment(id);
await loadData();


}

const confirmed = appointments.filter(a => a.status === 'Confirmed').length;
const waiting = appointments.filter(a => a.status === 'Waiting').length;
const completed = appointments.filter(a => a.status === 'Completed').length;

return ( <div className="appointments-layout"> <aside className="appointment-sidebar"> <div className="sidebar-title"> <h2>Schedule</h2> <span>{appointments.length} appointments</span> </div>


    <div className="appointment-list">
      {appointments.map((a) => (
        <div
          key={a.id}
          className={`appointment-item ${
            selectedAppointment?.id === a.id ? 'active' : ''
          }`}
          onClick={() => setSelectedAppointment(a)}
        >
          <div className="appointment-time">
            {a.appointment_time}
          </div>

          <div className="appointment-info">
            <h4>{a.patient_name}</h4>
            <p>{a.doctor_name}</p>
          </div>
        </div>
      ))}
    </div>
  </aside>

  <main className="appointment-main">
    <section className="appointment-hero">
      <div>
        <h1>Appointment Management</h1>
        <p>Real-time scheduling connected to patients and doctors</p>
      </div>

      <button className="live-btn">Live Database</button>
    </section>

    <section className="appointment-stats">
      <div className="stat-card">
        <h2>{appointments.length}</h2>
        <span>Total</span>
      </div>

      <div className="stat-card">
        <h2>{confirmed}</h2>
        <span>Confirmed</span>
      </div>

      <div className="stat-card">
        <h2>{waiting}</h2>
        <span>Waiting</span>
      </div>

      <div className="stat-card">
        <h2>{completed}</h2>
        <span>Completed</span>
      </div>
    </section>

    {selectedAppointment && (
      <section className="appointment-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {selectedAppointment.patient_name?.charAt(0)}
          </div>

          <div>
            <h2>{selectedAppointment.patient_name}</h2>
            <p>{selectedAppointment.doctor_name}</p>

            <span className={`status ${selectedAppointment.status.toLowerCase()}`}>
              {selectedAppointment.status}
            </span>
          </div>
        </div>

        <div className="profile-grid">
          <div>
            <strong>Department</strong>
            <p>{selectedAppointment.department}</p>
          </div>

          <div>
            <strong>Date</strong>
            <p>{selectedAppointment.appointment_date}</p>
          </div>

          <div>
            <strong>Time</strong>
            <p>{selectedAppointment.appointment_time}</p>
          </div>

          <div>
            <strong>Appointment ID</strong>
            <p>{selectedAppointment.appointment_id}</p>
          </div>
        </div>

        <button
          className="delete-btn"
          onClick={() => handleDelete(selectedAppointment.id)}
        >
          Delete Appointment
        </button>
      </section>
    )}

    <section className="booking-panel">
      <h2>Book New Appointment</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Appointment ID"
          value={form.appointment_id}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_id: e.target.value
            })
          }
        />

        <select
          value={form.patient_id}
          onChange={(e) =>
            setForm({
              ...form,
              patient_id: e.target.value
            })
          }
        >
          <option value="">Select Patient</option>

          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.full_name}
            </option>
          ))}
        </select>

        <select
          value={form.doctor_id}
          onChange={(e) =>
            setForm({
              ...form,
              doctor_id: e.target.value
            })
          }
        >
          <option value="">Select Doctor</option>

          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.full_name} ({d.specialization})
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.appointment_date}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_date: e.target.value
            })
          }
        />

        <input
          type="time"
          value={form.appointment_time}
          onChange={(e) =>
            setForm({
              ...form,
              appointment_time: e.target.value
            })
          }
        />

        <textarea
          placeholder="Appointment notes"
          value={form.notes}
          onChange={(e) =>
            setForm({
              ...form,
              notes: e.target.value
            })
          }
        />

        <button type="submit">
          Book Appointment
        </button>
      </form>
    </section>
  </main>
</div>


);
}
