import api from './api.tsx';

const initAuthApi = async () => {
  return await api();
};

const authApi = initAuthApi();

export default authApi;
