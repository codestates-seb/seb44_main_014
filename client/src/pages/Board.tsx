import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { styled } from 'styled-components';
// Components
import SearchFilter from '../components/Board/SearchFilter.tsx';
import TabMenu from '../components/Board/TabMenu.tsx';
import SortButtons from '../components/Board/SortButtons.tsx';
import BoardList from '../components/Board/BoardList.tsx';
import Pagination from '../components/Board/Pagination.tsx';
// DUMMY DATA
import { PAGINATION } from '../data/boardDummyData.ts';
import { IBoardList, IFilterInfo } from '../interface/board.tsx';

const Board = () => {
  const navigate = useNavigate();
  // tabMenu active 상태 체크
  const [tabLeft, setTabLeft] = useState<boolean>(true);
  const [tabRight, setTabRight] = useState<boolean>(!tabLeft);
  // 정렬 active 상태 체크
  const [newer, setNewer] = useState<boolean>(true);
  const [mostViewed, setMostViewed] = useState<boolean>(!newer);
  // 태그 active 상태 체크
  const [activeGender, setActiveGender] = useState<number | null>();
  const [activeFood, setActiveFood] = useState<number | null>();
  // 리스트 정렬
  const [pageInfo, setPageInfo] = useState(PAGINATION.pageInfo);
  const [lists, setLists] = useState<IBoardList[]>(PAGINATION.data);
  // endPoint 파라미터
  const [filterInfo, setFilterInfo] = useState<IFilterInfo>({
    page: 1,
    category: '밥먹기',
    genderTag: null,
    foodTag: null,
  });
  const [currentApi, setCurrentApi] = useState<string>(`&size=10&category=밥먹기`);

  useEffect(() => {
    console.log(filterInfo);
    console.log(`${import.meta.env.VITE_APP_API_URL}/board?page=${filterInfo.page}${currentApi}`);
    // axios
    //   .get(`${import.meta.env.VITE_APP_API_URL}/board?page=${filterInfo.page}&size=10&category=밥먹기`)
    //   .then((res) => {
    //     console.log(res);
    //     setPageInfo();
    //     setLists();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, [filterInfo, currentApi]);

  // TODO: 임시. 사용자 로그인 상태 가져올 것
  const isLoggedIn = true;
  const handleNavigate = () => {
    if (!isLoggedIn) {
      alert('로그인 후 작성 가능합니다.');
      navigate('/login');
    } else {
      navigate('/board/posts');
    }
  };

  return (
    <>
      {/* 상단 검색, 태그 영역 */}
      <SearchFilter
        tabLeft={tabLeft}
        activeGender={activeGender}
        setActiveGender={setActiveGender}
        activeFood={activeFood}
        setActiveFood={setActiveFood}
        filterInfo={filterInfo}
        setFilterInfo={setFilterInfo}
        setCurrentApi={setCurrentApi}
      />

      {/* 밥먹기, 장보기 탭메뉴 */}
      <ListLayout>
        <TabMenu
          tabLeft={tabLeft}
          setTabLeft={setTabLeft}
          tabRight={tabRight}
          setTabRight={setTabRight}
          setActiveGender={setActiveGender}
          setActiveFood={setActiveFood}
          filterInfo={filterInfo}
          setFilterInfo={setFilterInfo}
          setCurrentApi={setCurrentApi}
        />

        {/* 게시판 영역 */}
        <ListsSection>
          <ListTop>
            <ListH2>게시판</ListH2>
            <button onClick={() => handleNavigate()}>글 작성</button>
          </ListTop>
          <SortButtons
            newer={newer}
            setNewer={setNewer}
            mostViewed={mostViewed}
            setMostViewed={setMostViewed}
            lists={lists}
            setLists={setLists}
          />

          {/* 게시글 리스트 */}
          <ul>
            {lists.map((list, idx) => (
              <BoardList key={idx} list={list} />
            ))}
          </ul>
          <Pagination filterInfo={filterInfo} setFilterInfo={setFilterInfo} pageInfo={pageInfo} />
        </ListsSection>
      </ListLayout>
    </>
  );
};

const ListLayout = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  @media screen and (min-width: 1024px) {
    display: flex;
  }
`;

const ListsSection = styled.section`
  width: 100%;
  padding: 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 5rem 3.125rem;
  }
`;

const ListTop = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    padding: 0.5rem;
    background-color: var(--color-white);
    border-radius: 5px;
    font-size: 0.875rem;
    &:hover,
    &:active {
      background-color: var(--color-orange);
      color: var(--color-white);
    }
  }
`;

const ListH2 = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  @media screen and (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

export default Board;
