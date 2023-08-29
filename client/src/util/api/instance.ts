import axios from 'axios';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_URL}`,
});

//요청시 AccessToken 계속 보내주기
instance.interceptors.request.use(
  function (config: any) {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

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
  },
  function (error) {
    return Promise.reject(error);
  }
);

// AccessToken이 만료됐을때 처리
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401 || status === 500) {
      const originalRequest = config;
      const refreshToken = localStorage.getItem('refreshToken');
      // 새로운 토큰 요청
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/auth/reissue`,
        {},
        { headers: { refresh: `${refreshToken}` } }
      );
      // 새로운 토큰 저장
      const newAccessToken = response.headers.authorization;
      localStorage.setItem('accessToken', newAccessToken);
      originalRequest.headers.authorization = `${newAccessToken}`;
      // 요청 실패했던 요청 새로운 accessToken으로 재요청
      return axios(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default instance;
