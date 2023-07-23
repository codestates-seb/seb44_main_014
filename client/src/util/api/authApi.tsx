import api from './api.tsx';

const initAuthApi = async () => {
  return await api();
};

const authApi = await initAuthApi();

export default authApi;
