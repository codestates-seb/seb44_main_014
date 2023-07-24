import axios from 'axios';

const postSignUp = async (email: string, password: string, samePassword: string) => {
  try {
    return axios.post(`${import.meta.env.VITE_APP_API_URL}/users/signup`, {
      email,
      password,
      samePassword,
    });
  } catch (error) {
    throw new Error('이미 가입 되어있는 이메일 입니다.');
  }
};
export default postSignUp;
