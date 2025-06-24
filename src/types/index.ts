export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor';
  specialty?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  degrees: string[];
  achievements: string[];
  rating: number;
  reviews: number;
  image: string;
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  disease: string;
  preferredDoctor?: string;
  timeSlot?: string;
  date: string;
  status: 'pending' | 'confirmed' | 'completed';
}

export interface Clinic {
  name: string;
  ranking: string;
  awards: string[];
  totalPatients: number;
  totalDoctors: number;
  rating: number;
  reviews: number;
}