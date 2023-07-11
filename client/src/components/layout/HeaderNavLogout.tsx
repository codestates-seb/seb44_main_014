import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faTableList, faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const HeaderNavLogout = () => {
  return (
    <HeaderNavContainer>
      <HeaderNavContents>
        <HeaderNavItems>
          <HeaderNavIcons icon={faHouse} />
          <Link to="/">홈</Link>
        </HeaderNavItems>
        <HeaderNavItems>
          <HeaderNavIcons icon={faTableList} />
          <Link to="/board">보드</Link>
        </HeaderNavItems>
        <HeaderNavItems>
          <HeaderNavIcons icon={faUser} />
          <Link to="/users/mypage/:memberId">마이페이지</Link>
        </HeaderNavItems>
        <HeaderNavItems>
          <HeaderNavIcons icon={faArrowRightFromBracket} />
          <Link to="/">로그아웃</Link>
        </HeaderNavItems>
      </HeaderNavContents>
    </HeaderNavContainer>
  );
};

const HeaderNavContainer = styled.div`
  display: none;
  position: absolute;
  right: 0;
  top: 3.125rem;
  width: 165px;
  height: 220px;
  background-color: #fff;
  border-radius: 0.625rem;
  box-shadow: -0.125rem 0.125rem 0.3125rem rgba(0, 0, 0, 0.25);
  @media screen and (max-width: 1024px) {
    display: block;
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
  font-size: 16px;
  margin-bottom: 1.25rem;
  width: 9.6875rem;
`;

const HeaderNavIcons = styled(FontAwesomeIcon)`
  margin-right: 0.625rem;
  width: 18px;
  height: 18px;
  color: #000;
`;

export default HeaderNavLogout;
