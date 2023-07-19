import axios from 'axios';

const postLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw new Error('Failed to login. Please try again.'); // You can customize the error message as per your requirements
  }
};

export default postLogin;
