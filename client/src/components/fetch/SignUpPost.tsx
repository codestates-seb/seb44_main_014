import axios from 'axios';

const SignUpPost = async (email, password, copyPassword) => {
  try {
    const response = await axios.post('/users/signup', { email, password, copyPassword });
    return response.data;
  } catch (error) {
    throw new Error('이미 가입 되어있는 이메일 입니다.'); // You can customize the error message as per your requirements
  }
};
export default SignUpPost;
