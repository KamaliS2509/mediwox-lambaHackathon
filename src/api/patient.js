import axios from 'axios';

const BASE_URL = 'https://77dy1g1hwf.execute-api.ap-southeast-2.amazonaws.com/prod';

export const getPatientInfo = async (patientId) => {
  const response = await axios.get(${BASE_URL}/patients/${patientId});
  return response.data;
};