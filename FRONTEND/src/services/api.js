const BASE_URL = 'http://127.0.0.1:5000/api';

// ================= AUTH =================

export async function loginUser(data) {
const response = await fetch(`${BASE_URL}/auth/login`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) {
throw new Error(result.message || 'Login failed');
}

return result;
}

export async function registerUser(data) {
const response = await fetch(`${BASE_URL}/auth/register`, {
method: 'POST',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) {
throw new Error(result.message || 'Registration failed');
}

return result;
}

// ================= DOCTORS =================

export async function getDoctors(search = '') {
const url = search
? `${BASE_URL}/doctors/?search=${encodeURIComponent(search)}`
: `${BASE_URL}/doctors/`;

const response = await fetch(url);

if (!response.ok) throw new Error('Failed to fetch doctors');

return await response.json();
}

export async function getDoctorById(id) {
const response = await fetch(`${BASE_URL}/doctors/${id}`);

if (!response.ok) throw new Error('Failed to fetch doctor');

return await response.json();
}

export async function addDoctor(data) {
const response = await fetch(`${BASE_URL}/doctors/`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to add doctor');

return result;
}

export async function updateDoctor(id, data) {
const response = await fetch(`${BASE_URL}/doctors/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to update doctor');

return result;
}

export async function deleteDoctor(id) {
const response = await fetch(`${BASE_URL}/doctors/${id}`, {
method: 'DELETE'
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to delete doctor');

return result;
}

// ================= PATIENTS =================

export async function getPatients(search = '') {
  const url = search
    ? `${BASE_URL}/patients/?search=${encodeURIComponent(search)}`
    : `${BASE_URL}/patients/`;

  const response = await fetch(url);

  const text = await response.text();
  console.log('Patients API response:', text);

  if (!response.ok) {
    throw new Error(text || 'Failed to fetch patients');
  }

  return JSON.parse(text);
}

export async function searchPatients(query) {
return await getPatients(query);
}

export async function getPatientById(id) {
const response = await fetch(`${BASE_URL}/patients/${id}`);

if (!response.ok) throw new Error('Failed to fetch patient');

return await response.json();
}

export async function addPatient(data) {
const response = await fetch(`${BASE_URL}/patients/`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to add patient');

return result;
}

export async function updatePatient(id, data) {
const response = await fetch(`${BASE_URL}/patients/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to update patient');

return result;
}

export async function deletePatient(id) {
const response = await fetch(`${BASE_URL}/patients/${id}`, {
method: 'DELETE'
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to delete patient');

return result;
}

// ================= APPOINTMENTS =================

export async function getAppointments() {
const response = await fetch(`${BASE_URL}/appointments/`);

if (!response.ok) throw new Error('Failed to fetch appointments');

return await response.json();
}

export async function addAppointment(data) {
const response = await fetch(`${BASE_URL}/appointments/`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to add appointment');

return result;
}

export async function updateAppointment(id, data) {
const response = await fetch(`${BASE_URL}/appointments/${id}`, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to update appointment');

return result;
}

export async function deleteAppointment(id) {
const response = await fetch(`${BASE_URL}/appointments/${id}`, {
method: 'DELETE'
});

const result = await response.json();

if (!response.ok) throw new Error(result.message || 'Failed to delete appointment');

return result;
}

// blood 
export const getBloodInventory = async()=>{

const response = await fetch(
"http://127.0.0.1:5000/api/blood/inventory"
);


return await response.json();

};
