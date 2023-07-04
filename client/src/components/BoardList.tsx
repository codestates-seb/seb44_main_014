import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faComment } from '@fortawesome/free-solid-svg-icons';

const BoardList = () => {
  return (
    <ListContainer>
      <ListFlex>
        <ListText>
          <ListH3>연남동 ㅇㅇ라면 2인 선착순!</ListH3>
          <ListFlex>
            <div>
              <ListTag># 일식</ListTag>
              <ListTag># 상관없음</ListTag>
            </div>
            <ListStatus>모집 중</ListStatus>
          </ListFlex>
        </ListText>
        <ListImg src="../../public/img/background_grocery.jpg" alt="" />
      </ListFlex>
      <ListFlex>
        <ListUserInfo>
          <span>끼룩갈메기</span>
          <span>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> 4.6
          </span>
          <span>
            <FontAwesomeIcon icon={faEye} /> 12
          </span>
          <span>
            <FontAwesomeIcon icon={faComment} /> 5
          </span>
        </ListUserInfo>
        <ListWrittenTime>5 분전</ListWrittenTime>
      </ListFlex>
    </ListContainer>
  );
};

const ListContainer = styled.li`
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  box-sizing: border-box;
  &:hover {
    border: 1px solid var(--color-orange);
  }
`;

const ListFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 58px);
`;

const ListH3 = styled.h3`
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
`;

const ListTag = styled.span`
  font-size: 13px;
  font-weight: 700;
`;

const ListStatus = styled.span`
  position: relative;
  font-size: 0.75rem;
  &::after {
    position: absolute;
    left: -0.5rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background: #28ca6b;
    border-radius: 5px;
  }
`;

const ListImg = styled.img`
  display: block;
  width: 3rem;
  height: 3rem;
  margin-left: 10px;
`;

const ListUserInfo = styled.div`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  span {
    margin-right: 0.75rem;
    color: var(--color-black);
  }
  svg {
    margin-right: 0.25rem;
  }
`;

const ListWrittenTime = styled.span`
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: var(--color-black);
`;

export default BoardList;
