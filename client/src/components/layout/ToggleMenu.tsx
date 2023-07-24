import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faTableList,
  faUser,
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { IUserState } from '../../store/userSlice.ts';
import Logout from '../Logout/Logout.tsx';

interface ISHowToggle {
  setShowToggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToggleMenu = ({ setShowToggleMenu }: ISHowToggle) => {
  const isLoggedIn = useSelector((state: IUserState) => state.user.isLogin);
  const memberId = useSelector((state: IUserState) => state.user.memberId);

  return (
    <HeaderNavContainer>
      <HeaderNavContents>
        <HeaderNavItems>
          <HeaderNavIcons icon={faHouse} />
          <Link to="/" onClick={() => setShowToggleMenu(false)}>
            홈
          </Link>
        </HeaderNavItems>
        <HeaderNavItems>
          <HeaderNavIcons icon={faTableList} />
          <Link to="/board" onClick={() => setShowToggleMenu(false)}>
            보드
          </Link>
        </HeaderNavItems>
        {!isLoggedIn ? (
          <HeaderNavItems>
            <HeaderNavIcons icon={faUser} />
            <Link to="/users/signup" onClick={() => setShowToggleMenu(false)}>
              회원가입
            </Link>
          </HeaderNavItems>
        ) : (
          <HeaderNavItems>
            <HeaderNavIcons icon={faUser} />
            <Link to={`/users/mypage/${memberId}`} onClick={() => setShowToggleMenu(false)}>
              마이페이지
            </Link>
          </HeaderNavItems>
        )}
        {!isLoggedIn ? (
          <HeaderNavItems>
            <HeaderNavIcons icon={faArrowRightToBracket} />
            <Link to="/login" onClick={() => setShowToggleMenu(false)}>
              로그인
            </Link>
          </HeaderNavItems>
        ) : (
          <HeaderNavItems>
            <HeaderNavIcons icon={faArrowRightFromBracket} />
            <Logout setShowToggleMenu={setShowToggleMenu} />
          </HeaderNavItems>
        )}
      </HeaderNavContents>
    </HeaderNavContainer>
  );
};

const HeaderNavContainer = styled.div`
  display: block;
  position: fixed;
  right: 0;
  top: 3.125rem;
  width: 165px;
  height: 220px;
  background-color: #fff;
  border-radius: 0 0 0 0.625rem;
  box-shadow: -0.125rem 0.125rem 0.3125rem rgba(0, 0, 0, 0.25);
  z-index: 10;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const HeaderNavContents = styled.div`
  display: flex;
  justify-content: justify-content;
  flex-wrap: wrap;
  padding-top: 2.25rem;
  padding-bottom: 2.5rem;
  padding-left: 22px;
  padding-right: 1.5rem;
`;

const HeaderNavItems = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 9.6875rem;
  margin-bottom: 1.25rem;
  font-size: 16px;
  &:hover svg {
    color: var(--color-orange);
  }
`;

const HeaderNavIcons = styled(FontAwesomeIcon)`
  margin-right: 0.625rem;
  width: 18px;
  height: 18px;
  color: #000;
`;

export default ToggleMenu;
