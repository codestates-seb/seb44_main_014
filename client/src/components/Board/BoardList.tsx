import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faComment } from '@fortawesome/free-solid-svg-icons';

import { timeStamp } from '../../util/common.ts';
import { IBoardList } from '../../interface/board.ts';
import { GENDER_TAGS, FOOD_TAGS, STATUS } from '../../constant/constant.ts';

type BoardListProps = {
  list: IBoardList;
};

interface IStyledProps {
  $statusColor: string;
}

const BoardList = ({ list }: BoardListProps) => {
  const { genderTagId, foodTagId } = list.postTag;

  let genderTag = '';
  for (const gender of GENDER_TAGS) {
    if (genderTagId === gender.id) {
      genderTag = gender.text;
    }
  }

  let foodTag = '';
  for (const food of FOOD_TAGS) {
    if (foodTagId === food.id) {
      foodTag = food.text;
    }
  }

  let statusText = '';
  let statusColor = '';
  for (const state of STATUS) {
    if (list.status === state.status) {
      statusText = state.text;
      statusColor = state.color;
    }
  }

  const createdAt = timeStamp(new Date(list.createdAt));

  return (
    <ListContainer>
      <Link to={`/board/posts/${list.postId}`}>
        <ListTitle>
          <ListH3>{list.title}</ListH3>
          <ListStatus $statusColor={statusColor}>{statusText}</ListStatus>
        </ListTitle>
        <div>
          {list.category !== 'SHOPPING' && <ListTag>{foodTag}</ListTag>}
          <ListTag>{genderTag}</ListTag>
        </div>
        <ListFlex>
          <ListUserInfo>
            <span>{list.name}</span>
            <span>
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> {list.avgStarRate.toFixed(1)}
            </span>
            <span>
              <FontAwesomeIcon icon={faEye} /> {list.viewCount}
            </span>
            <span>
              <FontAwesomeIcon icon={faComment} /> {list.commentCount}
            </span>
          </ListUserInfo>
          <ListWrittenTime>{createdAt}</ListWrittenTime>
        </ListFlex>
      </Link>
    </ListContainer>
  );
};

const ListContainer = styled.li`
  width: 100%;
  margin-bottom: 0.625rem;
  padding: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  box-sizing: border-box;
  &:hover {
    border: 1px solid var(--color-orange);
  }
  @media screen and (min-width: 1024px) {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
`;

const ListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  @media screen and (min-width: 1024px) {
    margin-bottom: 1.25rem;
  }
`;

const ListH3 = styled.h3`
  width: calc(100% - 70px);
  font-family: 'NanumSquare', sans-serif;
  font-size: 0.875rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  line-height: 1.2;
  @media screen and (min-width: 1024px) {
    font-size: 1rem;
  }
`;

const ListTag = styled.span`
  font-size: 13px;
  font-weight: 700;
  @media screen and (min-width: 1024px) {
    font-size: 0.875rem;
  }
`;

const ListStatus = styled.span<IStyledProps>`
  position: relative;
  font-size: 0.75rem;
  line-height: 1;
  z-index: -1;
  &::after {
    position: absolute;
    left: -0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 6px;
    height: 6px;
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

const ListFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
  @media screen and (min-width: 1024px) {
    margin-top: 1.25rem;
  }
`;

const ListUserInfo = styled.div`
  font-size: 0.75rem;
  span {
    margin-right: 0.75rem;
    color: var(--color-black);
  }
  svg {
    margin-right: 0.25rem;
  }
  @media screen and (min-width: 1024px) {
    font-size: 0.875rem;
    span {
      margin-right: 1rem;
    }
  }
`;

const ListWrittenTime = styled.span`
  font-size: 0.75rem;
  color: var(--color-black);
  @media screen and (min-width: 1024px) {
    font-size: 0.875rem;
  }
`;

export default BoardList;
