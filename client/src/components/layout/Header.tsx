import styled from 'styled-components';
const Header = () => {
  return <HeaderContainer>Header</HeaderContainer>;
};

const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: pink;

  @media screen and (min-width: 1280px) {
    height: 70px;
  }
`;

export default Header;
