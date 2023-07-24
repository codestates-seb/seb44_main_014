import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
// Components
import SearchFilter from '../components/Board/SearchFilter.tsx';
import TabMenu from '../components/Board/TabMenu.tsx';
import SortButtons from '../components/Board/SortButtons.tsx';
import BoardList from '../components/Board/BoardList.tsx';
import Pagination from '../components/Board/Pagination.tsx';
import Loading from '../components/Loading.tsx';
import NoBoardList from '../components/Board/NoBoardList.tsx';

import { category, ICategoryState } from '../store/listCategorySlice.ts';
import { IUserState } from '../store/userSlice.ts';
import { IBoardList, IFilterInfo, IPageInfo } from '../interface/board.ts';
import authApi from '../util/api/authApi.tsx';

const Board = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isShopping = useSelector((state: ICategoryState) => state.category.value);
  const isLoggedIn = useSelector((state: IUserState) => state.user.isLogin);
  // 정렬 active 상태 체크
  const [newer, setNewer] = useState<boolean>(true);
  const [mostViewed, setMostViewed] = useState<boolean>(!newer);
  // 리스트 정렬
  const [pageInfo, setPageInfo] = useState<IPageInfo>({
    page: 1,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const [lists, setLists] = useState<IBoardList[]>([]);
  // endPoint 파라미터
  const [filterInfo, setFilterInfo] = useState<IFilterInfo>({
    page: 1,
    category: '',
    genderTag: null,
    foodTag: null,
  });
  const [currentApi, setCurrentApi] = useState<string>(
    isShopping === 'SHOPPING' ? `&category=SHOPPING` : `&category=EATING`
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFilterInfo({ ...filterInfo, category: isShopping });
    dispatch(category('EATING'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getBoardList = async () => {
      (await authApi)
        .get(`/board/search?page=${filterInfo.page}${currentApi}`)
        .then((res) => {
          setPageInfo(res.data.pageInfo);
          setLists(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    if (isLoggedIn) {
      getBoardList();
    } else {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/board/search/notlogin?page=${filterInfo.page}${currentApi}`)
        .then((res) => {
          setPageInfo(res.data.pageInfo);
          setLists(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [isLoggedIn, filterInfo, currentApi]);

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
      <SearchFilter filterInfo={filterInfo} setFilterInfo={setFilterInfo} setCurrentApi={setCurrentApi} />

      {/* 밥먹기, 장보기 탭메뉴 */}
      <ListLayout>
        <TabMenu filterInfo={filterInfo} setFilterInfo={setFilterInfo} setCurrentApi={setCurrentApi} />

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
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <ul>
                {lists.length === 0 && <NoBoardList />}
                {lists.map((list, idx) => (
                  <BoardList key={idx} list={list} />
                ))}
              </ul>
              {lists.length !== 0 && (
                <Pagination filterInfo={filterInfo} setFilterInfo={setFilterInfo} pageInfo={pageInfo} />
              )}
            </div>
          )}
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
