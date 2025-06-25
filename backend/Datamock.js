const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@hospital.com',
    password: 'sarah123',
    specialty: 'Cardiology',
    experience: 15,
    degrees: ['MD Cardiology', 'Fellowship in Interventional Cardiology'],
    achievements: ['Best Cardiologist Award 2023', 'Published 50+ Research Papers'],
    rating: 4.9,
    reviews: 245,
    image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: '10',
    name: 'Dr. Vikram Joshi',
    email: 'vikram.joshi@hospital.com',
    password: 'vikram123',
    specialty: 'Pediatrics',
    experience: 9,
    degrees: ['MD Pediatrics'],
    achievements: ['National Immunization Champion'],
    rating: 4.6,
    reviews: 190,
    image: 'https://images.pexels.com/photos/8376266/pexels-photo-8376266.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@hospital.com',
    password: 'michael123',
    specialty: 'Dermatology',
    experience: 12,
    degrees: ['MD Dermatology', 'Board Certified Dermatologist'],
    achievements: ['Excellence in Skin Care Award', 'Top 10 Dermatologists 2023'],
    rating: 4.8,
    reviews: 189,
    image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  },
  {
    id: '3',
    name: 'Dr. James Thompson',
    email: 'james.thompson@hospital.com',
    password: 'james123',
    specialty: 'General Medicine',
    experience: 20,
    degrees: ['MD Internal Medicine', 'Board Certified Family Medicine'],
    achievements: ['Community Service Award', '25 Years of Excellence'],
    rating: 4.7,
    reviews: 567,
    image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400',
    available: true,
  }
];

const appointments = [
  {
    id: '1',
    patientName: 'John Smith',
    age: 45,
    phone: '(555) 123-4567',
    email: 'john.smith@email.com',
    address: '123 Main St, City, State',
    disease: 'Chest Pain',
    preferredDoctor: 'Dr. Sarah Wilson',
    timeSlot: '09:00 AM',
    date: '2024-01-15',
    status: 'confirmed',
  },
  {
    id: '2',
    patientName: 'Mary Johnson',
    age: 32,
    phone: '(555) 987-6543',
    email: 'mary.johnson@email.com',
    address: '456 Oak Ave, City, State',
    disease: 'Skin Rash',
    preferredDoctor: 'Dr. Michael Chen',
    timeSlot: '10:30 AM',
    date: '2024-01-16',
    status: 'pending',
  },
  {
    id: '3',
    patientName: 'Alice Brown',
    age: 29,
    phone: '(555) 246-1357',
    email: 'alice.brown@email.com',
    address: '789 Pine Rd, City, State',
    disease: 'Pediatric Fever',
    preferredDoctor: 'Dr. Vikram Joshi',
    timeSlot: '11:00 AM',
    date: '2024-01-17',
    status: 'confirmed',
  }
];

// Extract login data only
const allowedDoctors = doctors.map(({ email, password }) => ({
  email,
  password,
  
}));

// ✅ ES Module export for Lambda compatibility
export { doctors, appointments, allowedDoctors };
