import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEye, faComment, faStar } from '@fortawesome/free-solid-svg-icons';

import BoardComment from '../components/Board/BoardComment.tsx';

interface IStyledProps {
  $statusColor: string;
}

const BoardDetail = () => {
  const statusColor = '#28CA6B';
  // let statusColor: string;
  // if (list.status === '모집 종료') {
  //   statusColor = '#EE3D16';
  // } else if (list.status === '모집 완료') {
  //   statusColor = '#FFD233';
  // } else {
  //   statusColor = '#28CA6B';
  // }

  return (
    <DetailContainer>
      {/* 상단 정보 영역 */}
      <DetailHeader>
        <DetailTitleArea>
          <TitleLeft>
            <BackButton>
              <FontAwesomeIcon icon={faAngleLeft} />
            </BackButton>
            <TitleH2>연남동 oo라멘 2인 선착순!</TitleH2>
          </TitleLeft>
          <ListStatus $statusColor={statusColor}>모집 중</ListStatus>
        </DetailTitleArea>
        <DetailInfoArea>
          <InfoLeft>
            <InfoTag># 일식</InfoTag>
            <InfoTag># 남녀노소</InfoTag>
            <InfoNum>
              <FontAwesomeIcon icon={faEye} /> 12
            </InfoNum>
            <InfoNum>
              <FontAwesomeIcon icon={faComment} /> 3
            </InfoNum>
          </InfoLeft>
          <InfoTime>5분 전</InfoTime>
        </DetailInfoArea>
      </DetailHeader>
      <ContentsSection>
        <ContentsWrapper>
          {/* 내용 영역 */}
          <TextContainer>
            <TextArea>
              연남동 oo라멘 2인 선착순! 연남동 oo라멘 2인 선착순! 연남동 oo라멘 2인 선착순!연남동 oo라멘 2인 선착순!
              연남동 oo라멘 2인 선착순! 연남동 oo라멘 2인 선착순!연남동 oo라멘 2인 선착순! 연남동 oo라멘 2인 선착순!
              연남동 oo라멘 2인 선착순!
            </TextArea>
            {/* TODO: 작성자에게만 보여아 함 */}
            <ModifyButtons>
              <Link to="/board/questions/:questionId/edit">수정</Link>
              <button type="button">삭제</button>
            </ModifyButtons>
          </TextContainer>
          {/* 참가 신청 영역 */}
          <ParticipantContainer>
            <ApplyParticipate>
              모집인원 <span>1/2</span>
              <button type="button">신청</button>
            </ApplyParticipate>
            {/* TODO: 참가자에게만 보여아 함 */}
            <ParticipantId>참가자: 마포호랑이 끼룩갈메기</ParticipantId>
          </ParticipantContainer>
        </ContentsWrapper>
        {/* 작성자 프로필 영역 */}
        <ProfileContainer>
          <img src="/img/background_grocery.jpg" alt="" />
          <ProfileInfo>
            <InfoRow>
              <InfoId>끼룩갈메기</InfoId>
              <InfoScore>
                <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> 4.6
              </InfoScore>
            </InfoRow>
            <InfoRow>
              <InfoGender>여성</InfoGender>
              <InfoMode>조용히 밥만 먹어요</InfoMode>
            </InfoRow>
          </ProfileInfo>
        </ProfileContainer>
      </ContentsSection>
      {/* 댓글 영역 */}
      <BoardComment />
    </DetailContainer>
  );
};

const DetailContainer = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 40px 80px;
  }
  @media screen and (min-width: 1024px) {
    padding: 50px;
  }
`;

// 상단 정보 영역
const DetailHeader = styled.div`
  @media screen and (min-width: 1024px) {
    width: calc(100% - 220px);
  }
`;

const DetailTitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 70px);
  @media screen and (min-width: 768px) {
    width: auto;
    max-width: calc(100% - 80px);
  }
  @media screen and (min-width: 1024px) {
    max-width: calc(100% - 90px);
  }
`;

const BackButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.875rem;
  height: 1.875rem;
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

const TitleH2 = styled.h2`
  width: calc(100% - 1.875rem);
  font-family: 'NanumSquare', sans-serif;
  font-size: 1rem;
  line-height: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  @media screen and (min-width: 1024px) {
    width: auto;
    font-size: 1.25rem;
  }
`;

const ListStatus = styled.span<IStyledProps>`
  position: relative;
  margin-left: 1.75rem;
  font-size: 13px;
  z-index: -1;
  &::after {
    position: absolute;
    left: -0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: ${(props) => props.$statusColor};
    border-radius: 5px;
  }
  /* @media screen and (min-width: 768px) {
    margin-left: 1.75rem;
  } */
  @media screen and (min-width: 1024px) {
    font-size: 0.875rem;
    &::after {
      left: -1rem;
    }
  }
`;

const DetailInfoArea = styled.div`
  margin-top: 0.625rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 1024px) {
    margin-top: 1.25rem;
  }
`;

const InfoLeft = styled.div``;

const InfoTag = styled.span`
  font-size: 13px;
  font-weight: 700;
  @media screen and (min-width: 1024px) {
    font-size: 0.875rem;
  }
`;

const InfoNum = styled.span`
  margin-left: 0.625rem;
  color: var(--color-black);
  font-size: 13px;
  svg {
    margin-right: 0.25rem;
  }
`;

const InfoTime = styled.span`
  color: var(--color-black);
  font-size: 13px;
`;

const ContentsSection = styled.section`
  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: flex-start;
  }
`;

const ContentsWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    width: calc(100% - 220px);
  }
`;

// 본문 내용 영역
const TextContainer = styled.section`
  padding-top: 1.875rem;
`;

const TextArea = styled.div`
  padding: 1.25rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ModifyButtons = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  a,
  button {
    margin-left: 1rem;
    color: var(--color-black);
  }
`;

// 작성자 프로필 영역
const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 315px;
  margin-top: 1.25rem;
  margin-left: auto;
  padding: 1.25rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  img {
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 1.25rem;
    border-radius: 50%;
    @media screen and (min-width: 1024px) {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 1024px) {
    flex-direction: column;
    width: 200px;
    margin-top: 1.875rem;
    margin-left: 20px;
    padding: 1.875rem 1.25rem;
  }
`;

const ProfileInfo = styled.div`
  width: 225px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  &:last-of-type {
    margin-top: 0.625rem;
    @media screen and (min-width: 1024px) {
      flex-direction: column;
    }
  }
  @media screen and (min-width: 1024px) {
    justify-content: center;
    margin-top: 1.25rem;
  }
`;

const InfoId = styled.span`
  @media screen and (min-width: 1024px) {
    margin-right: 0.625rem;
  }
`;

const InfoScore = styled.span`
  color: var(--color-black);
  svg {
    margin-right: 0.25rem;
  }
`;

const InfoGender = styled.span`
  color: var(--color-black);
`;

const InfoMode = styled.span`
  position: relative;
  font-size: 13px;
  z-index: -1;
  &::after {
    position: absolute;
    left: -0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: var(--status-ing);
    /* background-color: ${(props) => props.$statusColor}; */
    border-radius: 5px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 1.25rem;
    font-size: 0.875rem;
    &::after {
      left: -1rem;
    }
  }
`;

// 참가 신청 영역
const ParticipantContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.25rem;
`;

const ApplyParticipate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
  font-size: 13px;
  span {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
  button {
    margin-right: 1.25rem;
    padding: 5px;
    background-color: #b3b3b3;
    border-radius: 5px;
    color: #ffffff;
    &:hover {
      background-color: var(--color-orange);
    }
  }
`;

const ParticipantId = styled.div`
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 13px;
  color: var(--color-black);
`;

export default BoardDetail;
