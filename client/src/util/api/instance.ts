import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
});

//요청시 AccessToken 계속 보내주기
instance.interceptors.request.use(function (config: any) {
  const accessToken = localStorage.getItem('login-token');
  const refreshToken = localStorage.getItem('login-refresh');

  if (!accessToken && !refreshToken) {
    config.headers['Authorization'] = null;
    config.headers['refresh'] = null;
    return config;
  }

  if (config.headers && accessToken && refreshToken) {
    config.headers['Authorization'] = `${accessToken}`;
    config.headers['refresh'] = `${refreshToken}`;
    return config;
  }
});

// AccessToken이 만료됐을때 처리
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    if (err.response && err.response.status === 401) {
      const newAccessToken = err.response.headers.authorization;
      const newRefreshToken = err.response.headers.refresh;
      if (newAccessToken) {
        localStorage.setItem('login-token', newAccessToken);
        localStorage.setItem('login-refresh', newRefreshToken);
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default instance;
