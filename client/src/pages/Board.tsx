import { useState } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUtensils, faWheatAwn } from '@fortawesome/free-solid-svg-icons';

import BoardList from '../components/BoardList.tsx';

const Board = () => {
  const [tabLeft, setTabLeft] = useState<boolean>(true);
  const [tabRight, setTabRight] = useState<boolean>(!tabLeft);
  const [newer, setNewer] = useState<boolean>(true);
  const [mostViewed, setMostViewed] = useState<boolean>(!newer);

  return (
    <>
      {/* 상단 검색, 태그 영역 */}
      <SeachSection>
        <InputArea>
          <Label htmlFor="search">검색</Label>
          <InputSearch type="text" id="search" />
          <ButtonSearch type="button">
            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#555555' }} />
          </ButtonSearch>
          <TagsArea>
            <TagsRow>
              <button># 여자만</button>
              <button># 남자만</button>
              <button># 상관없음</button>
            </TagsRow>
            <TagsRow>
              <button># 한식</button>
              <button># 중식</button>
              <button># 양식</button>
              <button># 일식</button>
              <button># 기타</button>
            </TagsRow>
          </TagsArea>
        </InputArea>
      </SeachSection>

      {/* 밥먹기, 장보기 탭메뉴 */}
      <TabMenu>
        <TabButton
          onClick={() => {
            setTabLeft(true);
            setTabRight(false);
          }}
          isactive={tabLeft}
        >
          <FontAwesomeIcon icon={faUtensils} /> 밥 먹기
        </TabButton>
        <TabButton
          onClick={() => {
            setTabLeft(false);
            setTabRight(true);
          }}
          isactive={tabRight}
        >
          <FontAwesomeIcon icon={faWheatAwn} /> 장 보기
        </TabButton>
      </TabMenu>

      {/* 게시판 영역 */}
      <ListsSection>
        <ListTop>
          <ListH2>게시판</ListH2>
          <WriteButton>글 작성</WriteButton>
        </ListTop>
        <SortedArea>
          <SortedButton
            onClick={() => {
              setNewer(true);
              setMostViewed(false);
            }}
            isactive={newer}
          >
            최신순
          </SortedButton>
          <SortedButton
            onClick={() => {
              setNewer(false);
              setMostViewed(true);
            }}
            isactive={mostViewed}
          >
            조회수
          </SortedButton>
        </SortedArea>
        <BoardListsArea>
          {/* 게시글 mapping */}
          <BoardList />
        </BoardListsArea>
      </ListsSection>
    </>
  );
};

const SeachSection = styled.section`
  /* position: absolute;
  left: 0;
  top: 50px; */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 375px;
  padding: 0 30px;
  background-image: url('../../public/img/background_grocery.jpg');
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-blend-mode: multiply;
`;

const InputArea = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.label`
  display: none;
`;

const InputSearch = styled.input`
  width: 100%;
  padding-left: 10px;
  padding-right: 36px;
  height: 2.25rem;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 0.875rem;
  box-sizing: border-box;
`;

const ButtonSearch = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
`;

const TagsArea = styled.ul``;

const TagsRow = styled.li`
  margin-top: 0.625rem;
  button {
    margin-right: 0.625rem;
    padding: 5px;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
  }
`;

const TabMenu = styled.div`
  display: flex;
`;

const TabButton = styled.button<{ isactive: boolean }>`
  flex: 50%;
  height: 2.5rem;
  background-color: ${(props) => (props.isactive ? '#F0930D' : '#F4F2EF')};
  color: ${(props) => (props.isactive ? '#ffffff' : '#000000')};
`;

const ListsSection = styled.section`
  padding: 1.875rem;
`;

const ListTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ListH2 = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 1rem;
  font-weight: 700;
`;

const WriteButton = styled.button`
  padding: 0.5rem;
  background-color: var(--color-white);
  border-radius: 5px;
  font-size: 0.875rem;
  &:hover,
  &:active {
    background-color: var(--color-orange);
    color: var(--color-white);
  }
`;

const SortedArea = styled.div`
  margin: 1.25rem 0;
`;

const SortedButton = styled.button<{ isactive: boolean }>`
  margin-right: 0.625rem;
  padding: 5px;
  background-color: ${(props) => (props.isactive ? '#F0930D' : '#F4F2EF')};
  border-radius: 5px;
  color: ${(props) => (props.isactive ? '#ffffff' : '#000000')};
  font-size: 0.75rem;
  &:hover,
  &:active {
    background-color: var(--color-orange);
    color: var(--color-white);
  }
`;

const BoardListsArea = styled.ul``;

export default Board;
