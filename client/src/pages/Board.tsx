import { useState /*, useEffect*/ } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { styled } from 'styled-components';
// Components
import SearchFilter from '../components/Board/SearchFilter.tsx';
import TabMenu from '../components/Board/TabMenu.tsx';
import SortButtons from '../components/Board/SortButtons.tsx';
import BoardList from '../components/Board/BoardList.tsx';
// DUMMY DATA
import { BOARD_LISTS } from '../data/boardDummyData.ts';
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
  const [lists, setLists] = useState<IBoardList[]>(BOARD_LISTS);
  // 서버 전달 정보
  const [filterInfo, setFilterInfo] = useState<IFilterInfo>({
    category: '밥먹기',
    search: '',
    genderTag: null,
    foodTag: null,
  });
  console.log(filterInfo);

  // useEffect(() => {
  //   getTabMenuData();
  // }, []);

  // const getTabMenuData = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/board?page=${1}&size=${10}&category=${밥먹기}`)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // const getSearchData = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/board?page=${1}&size=${10}&keyword=${연남동}&category=${장보기}`)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // const getGenderTagData = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/board?page=${1}&size=${10}&genderTag=${1}&category=${장보기}`)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // const getFoodTagData = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/board?page=${1}&size=${10}&foodTag=${1}&category=${장보기}`)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

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
