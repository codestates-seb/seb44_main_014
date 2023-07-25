import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IUserState } from '../../store/userSlice.ts';
import ToggleMenu from './ToggleMenu.tsx';
import Logout from '../Logout/Logout.tsx';
import { ILocationState } from '../../store/locationSlice.ts';

const Header = () => {
  const isLoggedIn = useSelector((state: IUserState) => state.user.isLogin);
  const memberId = useSelector((state: IUserState) => state.user.memberId);
  const locationAddress = useSelector((state: ILocationState) => state.location.address);
  const [showToggleMenu, setShowToggleMenu] = useState<boolean>(false);

  return (
    <>
      <HeaderContainer>
        {locationAddress || !isLoggedIn ? (
          <HeaderWrapper>
            <Link to="/location" onClick={() => setShowToggleMenu(false)}>
              <LocationBtn>
                <FontAwesomeIcon icon={faLocationDot} />
              </LocationBtn>
            </Link>
            <Link to="/" onClick={() => setShowToggleMenu(false)}>
              <Logo>#밥친구</Logo>
            </Link>
            <MenuBtn onClick={() => setShowToggleMenu(!showToggleMenu)}>
              {showToggleMenu ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
            </MenuBtn>
            <PCNav>
              <Link to="/board">보드</Link>
              {!isLoggedIn ? (
                <Link to="/users/signup">회원가입</Link>
              ) : (
                <Link to={`/users/mypage/${memberId}`}>마이페이지</Link>
              )}
              {!isLoggedIn ? <Link to="/login">로그인</Link> : <Logout setShowToggleMenu={setShowToggleMenu} />}
            </PCNav>
          </HeaderWrapper>
        ) : (
          <HeaderWrapper>
            <LocationBtn>
              <FontAwesomeIcon icon={faLocationDot} />
            </LocationBtn>
            <Logo>#밥친구</Logo>
          </HeaderWrapper>
        )}
      </HeaderContainer>
      {showToggleMenu && <ToggleMenu setShowToggleMenu={setShowToggleMenu} />}
    </>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 3.125rem;
  background-color: var(--color-green);

  @media screen and (min-width: 1024px) {
    height: 4.375rem;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 0 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 0 3.125rem;
  }
`;

const Logo = styled.h1`
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-family: Tenada;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (min-width: 1024px) {
    top: 1.3rem;
    font-size: 2rem;
  }
`;

const LocationBtn = styled.span`
  svg {
    width: 20px;
    height: 20px;
    color: #fff;
    @media screen and (min-width: 1024px) {
      width: 25px;
      height: 25px;
    }
  }
`;

const MenuBtn = styled.button`
  svg {
    width: 20px;
    height: 20px;
    color: #fff;
  }
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const PCNav = styled.nav`
  display: none;
  @media screen and (min-width: 1024px) {
    display: flex;
    justify-content: flex-end;
    a,
    button {
      margin-left: 0.625rem;
      padding: 0 0.5rem;
      color: #fff;
      font-family: 'NanumSquare', sans-serif;

      font-size: 1rem;
    }
  }
`;

export default Header;
