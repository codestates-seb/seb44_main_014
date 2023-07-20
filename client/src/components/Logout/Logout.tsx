import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '../../util/cookie/index.ts';
import { useDispatch } from 'react-redux';
import localStorage from 'redux-persist/es/storage';
import { logout } from '../../store/userSlice.ts';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    localStorage.removeItem('expiredAt');
    dispatch(logout());

    navigate('/'); //로그인 유저가 바뀔 때 발생하는 버그를 막기위해 reload설정
  };
  return (
    <LogoutButton onClick={logout}>
      <div>로그아웃</div>
    </LogoutButton>
  );
};

export default Logout;

const LogoutButton = styled.div``;
