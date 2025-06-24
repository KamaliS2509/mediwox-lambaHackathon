import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, Clock, Calendar, Heart, Users } from 'lucide-react';
import { doctors, specialties, clinic } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const PatientDashboard: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const { user } = useAuth();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const filteredDoctors =
    selectedSpecialty === 'all'
      ? doctors
      : doctors.filter(
          (doctor) =>
            doctor.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
        );

  return (
    <div
      className={`min-h-screen bg-fixed bg-cover bg-center bg-no-repeat transition-opacity duration-1000 font-sans ${
        animateIn ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url('https://www.sermo.com/wp-content/uploads/2022/10/communicate-effectively-w-patients-img2-1050x555.jpeg')`,
      }}
    >
      <div className="min-h-screen flex flex-col items-center px-4 py-10 space-y-16">

        {/* Card: Welcome + Quick Actions + About */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="w-full max-w-screen-xl bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 text-gray-900"
        >
          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-1 font-serif">
              Welcome, {user?.name || user?.email || 'Patient'}!
            </h1>
            <p className="text-lg text-gray-700 font-light">
              Manage your health and appointments with ease.
            </p>
          </div>

          {/* Quick Actions */}
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Link
              to="/book-appointment"
              className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 hover:scale-105 transition transform font-medium"
            >
              <Calendar className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book Appointment</h3>
              <p className="text-blue-100">Schedule a visit with our doctors</p>
            </Link>
            <div className="bg-green-600 text-white p-6 rounded-lg hover:scale-105 transition transform font-medium">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Available Doctors</h3>
              <p className="text-green-100">{doctors.length} ready to help</p>
            </div>
            <div className="bg-purple-600 text-white p-6 rounded-lg hover:scale-105 transition transform font-medium">
              <Star className="h-8 w-8 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Clinic Rating</h3>
              <p className="text-purple-100">
                {clinic.rating}/5.0 from {clinic.reviews} reviews
              </p>
            </div>
          </motion.div>

          {/* About Clinic */}
          <h2 className="text-3xl font-bold mb-6 font-serif">About {clinic.name}</h2>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            {[
              {
                icon: <Award className="h-8 w-8 text-blue-600" />,
                title: 'Ranking',
                value: clinic.ranking,
              },
              {
                icon: <Users className="h-8 w-8 text-green-600" />,
                title: 'Patients Served',
                value: `${clinic.totalPatients.toLocaleString()}+`,
              },
              {
                icon: <Heart className="h-8 w-8 text-purple-600" />,
                title: 'Expert Doctors',
                value: `${clinic.totalDoctors}+ specialists`,
              },
              {
                icon: <Star className="h-8 w-8 text-yellow-600" />,
                title: 'Patient Rating',
                value: `${clinic.rating}/5.0 stars`,
              },
            ].map((item, index) => (
              <div key={index} className="text-center font-medium">
                <div className="mb-2 flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-semibold font-serif">{item.title}</h3>
                <p className="text-gray-600">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Specialties */}
        <motion.div className="w-full max-w-screen-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
         <h2 className="text-3xl font-bold mb-6 text-white font-serif text-center transform-gpu hover:translate-z-2 hover:scale-105 transition duration-500 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)] border border-black px-4 py-2 rounded-lg">
  Browse by Specialty
</h2>


          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-10">
            <button
              onClick={() => setSelectedSpecialty('all')}
              className={`p-3 rounded-lg text-center font-medium transition-all hover:scale-105 ${
                selectedSpecialty === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="text-2xl mb-1">🏥</div>
              All
            </button>
            {specialties.map((specialty) => (
              <button
                key={specialty.name}
                onClick={() => setSelectedSpecialty(specialty.name)}
                className={`p-3 rounded-lg text-center font-medium transition-all hover:scale-105 ${
                  selectedSpecialty === specialty.name
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-1">{specialty.icon}</div>
                {specialty.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Doctors List */}
        <motion.div className="w-full max-w-screen-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <h2 className="text-3xl font-bold mb-2 text-white font-serif text-center transform-gpu hover:translate-z-2 hover:scale-105 transition duration-500 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)] border border-black px-4 py-2 rounded-lg">
  {selectedSpecialty === 'all'
    ? 'All Doctors'
    : `${selectedSpecialty} Specialists`}
</h2>
<p className="text-gray-100 mb-8 font-light text-center">
  {filteredDoctors.length} doctor{filteredDoctors.length !== 1 && 's'} available
</p>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="p-6 rounded-lg bg-white bg-opacity-90 hover:shadow-lg hover:scale-[1.01] transition"
              >
                <div className="flex items-center mb-4 space-x-4">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold font-serif">{doctor.name}</h3>
                    <p className="text-blue-600">{doctor.specialty}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      {doctor.rating} ({doctor.reviews} reviews)
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-2 font-light">
                  <p className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    {doctor.experience} years experience
                  </p>

                  <div>
                    <h4 className="font-medium">Degrees:</h4>
                    {doctor.degrees.map((d, i) => (
                      <p key={i}>• {d}</p>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-medium">Achievements:</h4>
                    {doctor.achievements.map((a, i) => (
                      <p key={i}>• {a}</p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Patient Guidelines */}
        <motion.div className="w-full max-w-screen-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <h2 className="text-3xl font-bold mb-6 text-white font-serif text-center transform-gpu hover:translate-z-2 hover:scale-105 transition duration-500 drop-shadow-[2px_4px_6px_rgba(0,0,0,0.4)] border border-black px-4 py-2 rounded-lg">Patient Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="p-6 bg-white/80 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">✅ Do's</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 font-light">
                <ol>✔️ Bring valid ID & documents Carry your government ID, appointment slip, and insurance card.</ol>
                <ol>✔️ Arrive on time Be punctual for appointments, tests, or surgeries.</ol>
                <ol>✔️ Follow hospital rules Respect hospital visiting hours, silence zones, and sanitation protocols.</ol>
                <ol>✔️ Wear a mask (if required) For infection control, especially in OPD, ICU, and children’s ward.</ol>
                <ol>✔️ Inform staff of allergies Notify about any drug/food allergies or pre-existing conditions.</ol>
                <ol>✔️ Use hand sanitizer Sanitize hands before entering or leaving patient areas.</ol>
                <ol>✔️ Ask questions Don’t hesitate to clarify instructions with doctors or nurses.</ol>
                <ol>✔️ Respect privacy Allow others their confidentiality and rest time.</ol>
                <ol>✔️ Use hospital helpline For queries about appointments, reports, billing, or emergencies.</ol>
              </ul>
            </motion.div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-6 bg-white/80 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3">❌ Don'ts</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 font-light">
                <ol>❌ Don’t bring too many visitors Limit visitors to 1–2 per patient to reduce crowding.</ol>
                <ol>❌ Don’t touch medical equipment Avoid tampering with IVs, monitors, or oxygen masks.</ol>
                <ol>❌ Don’t offer food to patients Unless advised by doctors, unauthorized food can be dangerous.</ol>
                <ol>❌ Don’t ignore safety signs Pay attention to warnings like “No Entry,” “Radiation Zone,” or “Sterile Area.”</ol>
                <ol>❌ Don’t smoke or vape Smoking is strictly prohibited on hospital premises.</ol>
                <ol>❌ Don’t use mobile phones in restricted areas It can interfere with sensitive medical equipment.</ol>
                <ol>❌ Don’t record without permission No photography or video recording allowed without consent.</ol>
                <ol>❌ Don’t crowd emergency areas Allow free access for medical staff to treat critical patients.</ol>
                <ol>❌ Don’t offer bribes or tips Hospital staff are not allowed to accept money or gifts.</ol>
                <ol>❌ Don’t bring valuables The hospital is not responsible for loss of personal belongings.</ol>
              </ul>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PatientDashboard;






