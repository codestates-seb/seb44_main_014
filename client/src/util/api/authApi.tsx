import axios from 'axios';
import { getCookie, setCookie } from '../cookie/index.ts';
import moment from 'moment';

const api = async () => {
  //try, catch로 구분해줘야하나? try에서 에러(refreshToken이 만료됨)생기면 로그아웃시키고 로그인페이지로 리다이렉트?
  const refreshToken = getCookie('refreshToken');
  const expiredAt = localStorage.getItem('expiredAt');

  // accessToken 만료(10초전)시 /auth/reissue로 요청보내서 새로운 accessToken받기
  if (moment(expiredAt).diff(moment()) < 10000 && refreshToken) {
    const apiForm = axios.create({
      baseURL: `${import.meta.env.VITE_APP_API_URL}`,
      timeout: 3000,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Refresh: getCookie('refreshToken'),
      },
    });
    const response = await apiForm.post('/auth/reissue');

    setCookie('accessToken', response.headers['Authorization']);
    localStorage.setItem('expiredAt', moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss'));
  }

  // accessToken이 만료되지 않았거나 재발급 받는 경우
  const authCreate = axios.create({
    baseURL: `${import.meta.env.VITE_APP_API_URL}`,
    timeout: 3000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
  });

  return authCreate;
};

const authApi = api();

export default authApi;
