import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import axios from 'axios';

import BoardList from './Board/BoardList.tsx';
import Loading from './Loading.tsx';
import NoBoardList from './Board/NoBoardList.tsx';
import { IBoardList } from '../interface/board.ts';
import { category } from '../store/listCategorySlice.ts';
import { getCookie } from '../util/cookie/index.ts';

const AfterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lists, setLists] = useState<IBoardList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/home`, {
        headers: { Authorization: getCookie('accessToken') },
      })
      .then((res) => {
        console.log(res.data);
        setLists(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <BannerSection>
        <BannerTitle>밥친구</BannerTitle>
      </BannerSection>
      <ListSection>
        <ListBlock>
          <TitleArea>
            <TitleH3>밥 먹기 최신 글</TitleH3>
            <MoreButton
              onClick={() => {
                navigate('/board');
                dispatch(category('EATING'));
              }}
            >
              더 보기
            </MoreButton>
          </TitleArea>
          {isLoading ? (
            <Loading />
          ) : (
            <ul>
              {lists.length === 0 && <NoBoardList />}
              {lists
                .filter((list) => list.category === 'EATING')
                .slice(0, 4)
                .map((list, idx) => (
                  <BoardList key={idx} list={list} />
                ))}
            </ul>
          )}
        </ListBlock>
        <ListBlock>
          <TitleArea>
            <TitleH3>장 보기 최신 글</TitleH3>
            <MoreButton
              onClick={() => {
                navigate('/board');
                dispatch(category('SHOPPING'));
              }}
            >
              더 보기
            </MoreButton>
          </TitleArea>
          {isLoading ? (
            <Loading />
          ) : (
            <ul>
              {lists.length === 0 && <NoBoardList />}
              {lists
                .filter((list) => list.category === 'SHOPPING')
                .slice(0, 4)
                .map((list, idx) => (
                  <BoardList key={idx} list={list} />
                ))}
            </ul>
          )}
        </ListBlock>
      </ListSection>
    </>
  );
};

const BannerSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  padding: 0 1.875rem;
  background-image: url('/img/background_grocery.jpg');
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-blend-mode: multiply;
  @media screen and (min-width: 768px) {
    height: 300px;
  }
`;

const BannerTitle = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  color: #ffffff;
  font-size: 2rem;
  font-weight: 700;
  @media screen and (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ListSection = styled.ul`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.875rem 3rem;
  @media screen and (min-width: 768px) {
    padding: 0 5rem 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 0 3.125rem 5rem;
  }
`;

const ListBlock = styled.li`
  margin-top: 3rem;
  @media screen and (min-width: 1024px) {
    margin-top: 5rem;
  }
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  @media screen and (min-width: 768px) {
    margin-bottom: 1.875rem;
  }
  @media screen and (min-width: 1024px) {
  }
`;

const TitleH3 = styled.h3`
  padding-left: 1rem;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const MoreButton = styled.button`
  padding-right: 1rem;
  font-size: 13px;
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
  }
`;

export default AfterLogin;
