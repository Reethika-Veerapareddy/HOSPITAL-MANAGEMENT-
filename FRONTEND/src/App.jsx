import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientProfile from './pages/PatientProfile';
import Doctors from './pages/Doctors';
import Appointments from './pages/Appointments';
import DoctorProfile from './pages/DoctorProfile';
import BloodDashboard from "./pages/BloodDashboard";
import EmergencyRequests from "./pages/bloodbank/EmergencyRequests";
import DonorLogin from "./pages/bloodbank/DonorLogin";
import DonorRegister from "./pages/bloodbank/DonorRegister";

import Inventory from "./pages/bloodbank/Inventory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:id" element={<PatientProfile />} />
        <Route path="/doctors" element={<Doctors />} />
       <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/blood-requests" element={<EmergencyRequests />} />
        <Route path="/donor-login" element={<DonorLogin />} />
        <Route path="/donor-register" element={<DonorRegister />} />
        <Route
path="/blood-inventory"
element={<Inventory/>}
/>
        <Route
path="/blood-bank"
element={<BloodDashboard/>}
/>
      </Routes>
    </BrowserRouter>
  );
}