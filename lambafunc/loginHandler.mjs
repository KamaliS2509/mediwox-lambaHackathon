import { allowedDoctors } from './Datamock.js';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { email, password } = body;

    const doctor = allowedDoctors.find(
      doc => doc.email === email && doc.password === password
    );

    if (doctor) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Login successful!',
          doctorId: doctor.doctorId,
          name: doctor.name
        })
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          message: 'Invalid email or password'
        })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Server error',
        error: error.message
      })
    };
  }
};
