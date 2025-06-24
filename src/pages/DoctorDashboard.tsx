import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  BarChart3,
} from 'lucide-react';
import { appointments, specialties, doctors } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const DoctorDashboard: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Cardiology');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [viewMode, setViewMode] = useState<'daily' | 'monthly'>('daily');
  const { user } = useAuth();

  const doctorData = doctors.find((doc) => doc.name === user?.name);
  const [ratingScore, setRatingScore] = useState<number>(0);

  useEffect(() => {
    if (!doctorData) return;

    let current = 0;
    const end = doctorData.rating;
    const step = end / 60;

    const interval = setInterval(() => {
      current += step;
      if (current >= end) {
        current = end;
        clearInterval(interval);
      }
      setRatingScore(parseFloat(current.toFixed(1)));
    }, 20);

    return () => clearInterval(interval);
  }, [doctorData]);

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.date === selectedDate &&
      apt.specialty === selectedSpecialty &&
      apt.doctorEmail === user?.email
  );

  const todayStats = {
    total: filteredAppointments.length,
    confirmed: filteredAppointments.filter((apt) => apt.status === 'confirmed').length,
    pending: filteredAppointments.filter((apt) => apt.status === 'pending').length,
    completed: filteredAppointments.filter((apt) => apt.status === 'completed').length,
  };

  const updateAppointmentStatus = (
    appointmentId: string,
    newStatus: 'confirmed' | 'completed'
  ) => {
    console.log(`Updating appointment ${appointmentId} to ${newStatus}`);
  };

  const chartData =
    viewMode === 'daily'
      ? [
          { day: 'Mon', patients: 5 },
          { day: 'Tue', patients: 8 },
          { day: 'Wed', patients: 4 },
          { day: 'Thu', patients: 9 },
          { day: 'Fri', patients: 6 },
          { day: 'Sat', patients: 3 },
        ]
      : [
          { month: 'Jan', patients: 60 },
          { month: 'Feb', patients: 70 },
          { month: 'Mar', patients: 85 },
          { month: 'Apr', patients: 50 },
          { month: 'May', patients: 90 },
          { month: 'Jun', patients: 65 },
          { month: 'Jul', patients: 80 },
          { month: 'Aug', patients: 75 },
          { month: 'Sep', patients: 55 },
          { month: 'Oct', patients: 95 },
          { month: 'Nov', patients: 70 },
          { month: 'Dec', patients: 100 },
        ];

  return (
    <div className="relative min-h-screen py-8">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0"
        style={{
          backgroundImage:
            "url('/medical video/doctoe dashboad bg image.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Welcome Header */}
        <div className="bg-white/75 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-lg p-6 mb-8 transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome, {user?.name}!
                </h1>
                <p className="text-gray-600">
                  Manage your appointments and patient care
                </p>

                {doctorData && (
                  <div className="mt-4 flex items-center space-x-3">
                    <div className="relative w-14 h-14">
                      <svg className="absolute top-0 left-0 w-full h-full">
                        <circle cx="28" cy="28" r="24" stroke="#e5e7eb" strokeWidth="5" fill="none" />
                        <circle
                          cx="28"
                          cy="28"
                          r="24"
                          stroke={
                            doctorData.rating >= 4.5
                              ? '#22c55e'
                              : doctorData.rating >= 3.0
                              ? '#facc15'
                              : '#ef4444'
                          }
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray={`${(doctorData.rating / 5) * 150}, 150`}
                          transform="rotate(-90 28 28)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-gray-800">
                        <span>{ratingScore.toFixed(1)}</span>
                        <Star className="w-3 h-3" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Doctor Rating</p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-right space-y-2">
              <p className="text-sm text-gray-600">Today's Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard icon={<Calendar className="text-blue-600 w-6 h-6" />} label="Total Today" value={todayStats.total} />
          <StatCard icon={<CheckCircle className="text-green-600 w-6 h-6" />} label="Confirmed" value={todayStats.confirmed} />
          <StatCard icon={<AlertCircle className="text-yellow-600 w-6 h-6" />} label="Pending" value={todayStats.pending} />
          <StatCard icon={<Clock className="text-purple-600 w-6 h-6" />} label="Completed" value={todayStats.completed} />
        </div>

        {/* Chart */}
        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-lg p-6 mb-8 transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Patients Per {viewMode === 'daily' ? 'Day' : 'Month'}
            </h2>
            <button
              onClick={() => setViewMode(viewMode === 'daily' ? 'monthly' : 'daily')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all"
            >
              Toggle to {viewMode === 'daily' ? 'Monthly' : 'Daily'}
            </button>
          </div>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={viewMode === 'daily' ? 'day' : 'month'} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/75 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-lg p-6 mb-8 transition-shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Appointments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                Your Specialty
              </label>
              <select
                id="specialty"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specialties.map((specialty) => (
                  <option key={specialty.name} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white/75 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-lg p-6 transition-shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Appointments for {new Date(selectedDate).toLocaleDateString()}
            </h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {filteredAppointments.length} appointments
            </span>
          </div>

          {filteredAppointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments scheduled</h3>
              <p className="text-gray-600">No appointments found for the selected date and specialty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white/80 backdrop-blur-md">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                          <p className="text-gray-600">Age: {appointment.age} years</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            appointment.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600"><strong>Time:</strong> {appointment.timeSlot}</p>
                          <p className="text-sm text-gray-600"><strong>Phone:</strong> {appointment.phone}</p>
                          <p className="text-sm text-gray-600"><strong>Email:</strong> {appointment.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600"><strong>Condition:</strong> {appointment.disease}</p>
                          <p className="text-sm text-gray-600"><strong>Address:</strong> {appointment.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    {appointment.status === 'pending' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Confirm Appointment
                      </button>
                    )}
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => updateAppointmentStatus(appointment.id, 'completed')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Mark as Completed
                      </button>
                    )}
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card
const StatCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <div className="bg-white/75 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow flex items-center space-x-4">
    <div>{icon}</div>
    <div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  </div>
);

export default DoctorDashboard;






