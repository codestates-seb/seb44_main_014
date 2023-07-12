import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/UI/Button.tsx';

const UserRating = () => {
  return (
    <MainContainer>
      <HeaderContainer>
        <Link to="/">
          <XbtnPositioner>
            <HeaderQuitIcon icon={faArrowRightFromBracket} />
          </XbtnPositioner>
        </Link>
        <HeaderParagraph>
          📌 맛있게 드셨나요? 📌 <br />
          <br />더 나은 밥친구 환경을 위해
          <br /> 소중한 평가 부탁드려요!
        </HeaderParagraph>
      </HeaderContainer>
      <UserRatingContainer>
        <UserRatingComponent>
          <UserName>홍길동</UserName>
          <RatingStarsContainer>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
          </RatingStarsContainer>
          <Button>저장</Button>
        </UserRatingComponent>
        <UserRatingComponent>
          <UserName>홍길동</UserName>
          <RatingStarsContainer>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
          </RatingStarsContainer>
          <Button>저장</Button>
        </UserRatingComponent>
        <UserRatingComponent>
          <UserName>홍길동</UserName>
          <RatingStarsContainer>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
          </RatingStarsContainer>
          <Button>저장</Button>
        </UserRatingComponent>
        <UserRatingComponent>
          <UserName>홍길동</UserName>
          <RatingStarsContainer>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
            <RatingStarsBtn>
              <img src="/img/star-unfilled.png" alt="star-unfilled" width="75px" />
            </RatingStarsBtn>
          </RatingStarsContainer>
          <Button>저장</Button>
        </UserRatingComponent>
      </UserRatingContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: 31.25rem;
  margin: 50px 140px;

  @media (max-width: 768px) {
    margin: 30px 0;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 45.9375rem;
  height: 9.375rem;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    width: 325px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }
`;

const XbtnPositioner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const HeaderQuitIcon = styled(FontAwesomeIcon)`
  width: 1.25rem;
  height: 1.25rem;
`;

const HeaderParagraph = styled.p`
  width: 265px;
  padding-top: 1.25rem;
  line-height: 1.875rem;
  text-align: center;
  font-size: 1.5rem;
`;

const UserRatingContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 56.25rem;
  margin-left: auto;
  margin-right: auto;
`;

const UserRatingComponent = styled.div`
  width: 20rem;
  height: 8.75rem;
  margin: 3.75rem 2.8125rem;

  @media (max-width: 768px) {
    width: 325px;
    margin: 1.25rem auto;
  }
`;

const UserName = styled.div`
  font-size: 1rem;
  margin-left: 0.625rem;
  margin-bottom: 0.625rem;
`;

const RatingStarsContainer = styled.div`
  display: flex;
  margin-left: -0.625rem;
  margin-bottom: 0.9375rem;
`;

const RatingStarsBtn = styled.button`
  width: 3.75rem;
  height: 3.75rem;
  margin: 0 0.125rem;
`;

export default UserRating;
