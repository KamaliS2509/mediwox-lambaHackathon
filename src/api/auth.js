import axios from 'axios';

const BASE_URL = 'https://77dy1g1hwf.execute-api.ap-southeast-2.amazonaws.com/prod';

export const loginUser = async ({ email, password, role }) => {
  try {
    const response = await axios.post(${BASE_URL}/login, {
      email,
      password,
      role,
    });
    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error;
  }
};