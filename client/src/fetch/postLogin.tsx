import axios from 'axios';

const postLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/users/login', { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Failed to login. Please try again.'); // You can customize the error message as per your requirements
  }
};

export default postLogin;
