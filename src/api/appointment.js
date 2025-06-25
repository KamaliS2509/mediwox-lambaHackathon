import axios from 'axios';

const BASE_URL = 'https://77dy1g1hwf.execute-api.ap-southeast-2.amazonaws.com/prod';

export const bookAppointment = async (patientId, appointmentDetails) => {
  return axios.post(${BASE_URL}/appointment/${patientId}, appointmentDetails);
};

export const getAppointmentsByPatient = async (patientId) => {
  return axios.get(${BASE_URL}/appointment/${patientId});
};