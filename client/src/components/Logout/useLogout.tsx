// useLogoutAndRedirect.ts
import { useEffect } from 'react';
import axios from 'axios';
import { getCookie, removeCookie } from '../../util/cookie/index.ts';

import { useDispatch } from 'react-redux';
import { logout } from '../../store/userSlice.ts';
import { locationLogout } from '../../store/locationSlice.ts';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const useLogoutAndRedirect = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const refreshToken = getCookie('refreshToken');
  const expiredAt = localStorage.getItem('expiredAt');

  useEffect(() => {
    const handleLogout = async () => {
      if (moment(expiredAt).diff(moment()) <= 0 || (expiredAt && !refreshToken)) {
        localStorage.clear();
        dispatch(
          logout({
            memberId: null,
            isLogin: false,
            email: null,
            foodTagId: null,
          })
        );
        dispatch(locationLogout({ locationId: null }));
        try {
          await axios.delete(`${import.meta.env.VITE_APP_API_URL}/auth/logout`, {
            headers: { Refresh: getCookie('refreshToken') },
          });
        } catch (error) {
          console.error('Error during logout:', error);
        }

        removeCookie('accessToken');
        removeCookie('refreshToken');

        alert('로그인에 오류가 발생하여 자동 로그아웃 되었습니다.');
        navigate('/login'); // Redirect to the login page after logout
        // To prevent bugs related to user change, you can add a page reload
        window.location.reload();
      }
    };

    handleLogout();
  }, []);
};

export default useLogoutAndRedirect;
