import { styled } from 'styled-components';

const PageNotFound = () => {
  return (
    <NotFoundContainer>
      <div>
        <H2>페이지를 찾을 수 없습니다.</H2>
        <Img src="/img/NotFound.png" alt="NotFound" />
      </div>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 200px);
  @media screen and (min-width: 1024px) {
    height: calc(100vh - 220px);
  }
`;

const H2 = styled.h2`
  margin-bottom: 50px;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.5rem;
  text-align: center;
  @media screen and (min-width: 768px) {
    margin-bottom: 80px;
    font-size: 1.875rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 2.25rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 250px;
  height: 250px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

export default PageNotFound;
