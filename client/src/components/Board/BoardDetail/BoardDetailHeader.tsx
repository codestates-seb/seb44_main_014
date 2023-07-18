import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEye, faComment } from '@fortawesome/free-solid-svg-icons';

import { IBoardDetailData } from '../../../interface/board.ts';
import { timeStamp } from '../../../util/common.ts';

type BoardInfoProps = {
  boardInfo: IBoardDetailData;
};

interface IStyledProps {
  $statusColor: string;
}

const BoardDetailHeader = ({ boardInfo }: BoardInfoProps) => {
  const navigate = useNavigate();
  const { title, status, postTag, viewCount, commentCount, createdAt } = boardInfo;

  let newGenderTag: string;
  if (postTag.genderTagId === 1) {
    newGenderTag = '# 여자만';
  } else if (postTag.genderTagId === 2) {
    newGenderTag = '# 남자만';
  } else {
    newGenderTag = '# 남녀노소';
  }

  let newFoodTag: string;
  if (postTag.foodTagId === 1) {
    newFoodTag = '# 한식';
  } else if (postTag.foodTagId === 2) {
    newFoodTag = '# 중식';
  } else if (postTag.foodTagId === 3) {
    newFoodTag = '# 양식';
  } else if (postTag.foodTagId === 4) {
    newFoodTag = '# 일식';
  } else {
    newFoodTag = '# 기타';
  }

  let statusText: string;
  let statusColor: string;
  if (status === 'END') {
    statusText = '모집 종료';
    statusColor = '#EE3D16';
  } else if (status === 'COMPLETE') {
    statusText = '모집 완료';
    statusColor = '#FFD233';
  } else {
    statusText = '모집 중';
    statusColor = '#28CA6B';
  }

  const newTime = timeStamp(new Date(createdAt));

  return (
    <DetailHeader>
      <DetailTitleArea>
        <TitleLeft>
          <BackButton onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </BackButton>
          <TitleH2>{title}</TitleH2>
        </TitleLeft>
        <ListStatus $statusColor={statusColor}>{statusText}</ListStatus>
      </DetailTitleArea>
      <DetailInfoArea>
        <InfoLeft>
          <InfoTag>{newFoodTag}</InfoTag>
          <InfoTag>{newGenderTag}</InfoTag>
          <InfoNum>
            <FontAwesomeIcon icon={faEye} /> {viewCount}
          </InfoNum>
          <InfoNum>
            <FontAwesomeIcon icon={faComment} /> {commentCount}
          </InfoNum>
        </InfoLeft>
        <InfoTime>{newTime}</InfoTime>
      </DetailInfoArea>
    </DetailHeader>
  );
};

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

export default BoardDetailHeader;
