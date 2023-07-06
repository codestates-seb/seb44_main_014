import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import HeaderNavLogin from '../buttons/HeaderNavLogin.tsx';

const Header = () => {
  const [isClicked, setIsClicked] = useState(true);

  const ClickHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div>
      <HeaderContainer>
        <HeaderPositioner>
          <HeaderLeftContents>
            <Link to="/location">
              <LocationIcon icon={faLocationDot} />
            </Link>
          </HeaderLeftContents>
          <HeaderTitleContainer>
            <Link to="/">
              <HeaderTitle># 밥친구</HeaderTitle>
            </Link>
          </HeaderTitleContainer>
          <HeaderRightContents>
            <Link to="/board">
              <HeaderRightItems>보드</HeaderRightItems>
            </Link>
            <Link to="/users/mypage/:memberId">
              <HeaderRightItems>마이페이지</HeaderRightItems>
            </Link>
            <Link to="/">
              <HeaderRightItems>로그아웃</HeaderRightItems>
            </Link>
            {isClicked ? (
              <HeaderHamburgerIcon icon={faBars} onClick={ClickHandler} />
            ) : (
              <HeaderXIcon icon={faX} onClick={ClickHandler} />
            )}
          </HeaderRightContents>
        </HeaderPositioner>
      </HeaderContainer>
      {!isClicked && <HeaderNav />}
    </div>
  );
};

const HeaderContainer = styled.header`
  position: sticky;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 4.375rem;
  background-color: var(--color-green);

  @media screen and (max-width: 1024px) {
    height: 3.125rem;
  }
`;

const HeaderPositioner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: 3.125rem;
  margin-right: 3.125rem;

  @media screen and (max-width: 375px) {
    margin-left: 1.875rem;
    margin-right: 1.875rem;
  }
`;

const LocationIcon = styled(FontAwesomeIcon)`
  width: 1.5625rem;
  height: 1.5625rem;
  color: #fff;
`;

const HeaderLeftContents = styled.div`
  display: flex;
  width: 16.25rem;

  @media screen and (max-width: 1024px) {
    width: 1.875rem;
  }
`;

const HeaderTitleContainer = styled.h1`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  padding-top: 0.3125rem;
  color: #fff;
  font-family: Tenada;
  font-size: 2rem;
  font-weight: bold;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const HeaderRightContents = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 16.25rem;

  @media screen and (max-width: 1024px) {
    width: 1.875rem;
  }
`;

const HeaderRightItems = styled.div`
  margin-left: 1.875rem;
  color: #fff;
  font-size: 1rem;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const HeaderHamburgerIcon = styled(FontAwesomeIcon)`
  display: none;
  width: 1.5625rem;
  height: 1.5625rem;
  color: #fff;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`;

const HeaderXIcon = styled(FontAwesomeIcon)`
  display: none;
  width: 1.5625rem;
  height: 1.5625rem;
  color: #fff;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`;

const HeaderNav = styled(HeaderNavLogin)``;

export default Header;
