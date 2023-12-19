import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const Introduction = () => {
  return (
    <>
      <Section1>
        <EatingImg src="/img/Eating.png" alt="Spoon, fork, and plate" />
        <TextContainer>
          <div>
            <IntroText>
              혼자 밥을 먹자니 심심하고,
              <br />
              눈 딱 감고 들어간 가게는 1인분 주문불가!
              <br />
              그렇다고 장을 봐 해 먹자니 버리는 재료가 너무 많다!
            </IntroText>
            <IntroText>
              그래서 만들었습니다!
              <br />
              같이 밥먹을 친구를 구하고, <br />장 보고 나눌 동네 친구를 찾을 수 있는 플랫폼,
            </IntroText>
            <TitleH2>#밥친구</TitleH2>
            <Link to="/users/signup">
              <SignUp>회원가입</SignUp>
            </Link>
          </div>
        </TextContainer>
        <GroceryImg src="/img/Grocery.png" alt="Fruits" />
      </Section1>
      <Section2>
        <div>
          <DescriptionH2>목적에 맞는 사람들을 끌어모으자!</DescriptionH2>
          <DescriptionP>
            같이 밥 먹어요! - 밥 먹기 게시판
            <br />장 보고 나눠요! - 장 보기 게시판
          </DescriptionP>
        </div>
        <DescriptionImg src="/img/Board.png" alt="Board" />
      </Section2>
      <Section3>
        <div>
          <DescriptionBlackH2>‘조용히 밥만 먹어요’ 모드</DescriptionBlackH2>
          <DescriptionBlackP>
            밥 친구가 곧 동네 친구, <br />
            간단한 스몰 토크 좋아요 🙆
            <br />
            vs
            <br />
            오직 나의 목적은 한끼 해결,
            <br />
            불필요한 대화와 친목은 별로에요 🙅
          </DescriptionBlackP>
          <DescriptionBlackP>모두를 만족시킬 ‘조용히 밥만 먹어요’ 모드 on, off 기능</DescriptionBlackP>
        </div>
        <DescriptionColumnImg src="/img/Mode.png" alt="Mode" />
      </Section3>
      <Section4>
        <DescriptionImg src="/img/Rating.png" alt=" Rating" />
        <FlexOrder>
          <DescriptionH2>매너 별점 시스템</DescriptionH2>
          <DescriptionP>
            ‘바람 맞으면 어떡하지?!’
            <br />
            ‘상대방이 먹고 튀면 어떡하지?!’
            <br />
            낯선이와의 만남이 걱정 된다면?
          </DescriptionP>
          <DescriptionP>
            게시물 수정에서 모집종료 처리!
            <br />
            솔직한 매너 별점을 매겨보자!
          </DescriptionP>
        </FlexOrder>
      </Section4>
    </>
  );
};

const Section1 = styled.section`
  width: 100%;
  height: 100vh;
  background-color: var(--color-white);
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const IntroText = styled.p`
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const TitleH2 = styled.h2`
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
`;

const SignUp = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 50px;
  margin: 0 auto;
  border-radius: 8px;
  background: var(--color-orange);
  color: #ffffff;
  font-size: 0.875rem;
  @media screen and (min-width: 768px) {
    width: 200px;
    height: 50px;
    font-size: 1rem;
  }
`;

const EatingImg = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 25vw;
  }
`;

const GroceryImg = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 25vw;
  }
`;

const Section2 = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  background-color: var(--color-orange);
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0;
  }
`;

const DescriptionH2 = styled.h2`
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  color: #ffffff;
`;

const DescriptionP = styled.p`
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #ffffff;
  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const DescriptionImg = styled.img`
  order: 2;
  display: block;
  width: 80vw;
  max-width: 350px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 30vw;
    margin: 0;
  }
`;

const Section3 = styled.section`
  width: 100%;
  padding: 5rem 0 0;
  background-color: var(--color-white);
`;
const Section4 = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  padding: 5rem 0;
  background-color: var(--color-orange);
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0;
  }
`;
const FlexOrder = styled.div`
  order: 1;
  @media screen and (min-width: 768px) {
    order: 3;
  }
`;

const DescriptionBlackH2 = styled.h2`
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  color: #000000;
`;

const DescriptionBlackP = styled.p`
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #000000;
  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const DescriptionColumnImg = styled.img`
  display: block;
  width: 80vw;
  max-width: 350px;
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 50vw;
    max-width: 500px;
    margin: 5rem auto 0;
  }
`;

export default Introduction;
