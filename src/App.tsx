import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Login from './pages/Login';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import BookAppointment from './pages/BookAppointment';
import About from './components/About';     // ✅ Make sure this file exists
import Contact from './components/Contact'; // ✅ Make sure this file exists

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Auth Routes */}
            <Route path="/patient-login" element={<Login userType="patient" />} />
            <Route path="/doctor-login" element={<Login userType="doctor" />} />

            {/* Dashboards */}
            <Route path="/patient-dashboard" element={<PatientDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

            {/* Appointment */}
            <Route path="/book-appointment" element={<BookAppointment />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
