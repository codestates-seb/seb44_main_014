import axios from 'axios';

const postLogin = async (email: string, password: string) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_API_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
  return response;
};

export default postLogin;
