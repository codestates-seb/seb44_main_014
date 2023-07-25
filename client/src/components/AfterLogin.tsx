import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import BoardList from './Board/BoardList.tsx';
import Loading from './Loading.tsx';
import NoBoardList from './Board/NoBoardList.tsx';
import { IBoardList } from '../interface/board.ts';
import { category } from '../store/listCategorySlice.ts';
import { ILocationState } from '../store/locationSlice.ts';
import authApi from '../util/api/authApi.tsx';

const AfterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lists, setLists] = useState<IBoardList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const address = useSelector((state: ILocationState) => state.location.address);

  useEffect(() => {
    const getBoarList = async () => {
      (await authApi)
        .get(`/home`)
        .then((res) => {
          setLists(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    getBoarList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <LocationText>{address}</LocationText>
      <BannerSection>
        <h2>
          회원가입 후 게시글이 안 보이신다면 새로고침을 해주세요!
          <br />
          현재 해결 중에 있는 부분입니다..🥹
        </h2>
        {/* <BannerTitle>밥친구</BannerTitle> */}
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
              {lists.filter((list) => list.category === 'EATING').length === 0 && <NoBoardList />}
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
              {lists.filter((list) => list.category === 'SHOPPING').length === 0 && <NoBoardList />}
              {lists
                .filter((list) => list.category === 'SHOPPING')
                .slice(0, 4)
                .map((list, idx) => (
                  <BoardList key={idx} list={list} />
                ))}
            </ul>
          )}
        </ListBlock>
        <ListBlock>
          <TitleArea>
            <TitleH3># 한식 최신 글</TitleH3>
            <MoreButton
              onClick={() => {
                navigate('/board');
                // dispatch(category('SHOPPING'));
              }}
            >
              더 보기
            </MoreButton>
          </TitleArea>
          {isLoading ? (
            <Loading />
          ) : (
            <ul>
              {lists.filter((list) => list.postTag.foodTagId === 1).length === 0 && <NoBoardList />}
              {lists
                .filter((list) => list.postTag.foodTagId === 1)
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
  text-align: center;
  line-height: 1.5;
  @media screen and (min-width: 768px) {
    height: 300px;
  }
`;

const LocationText = styled.div`
  position: absolute;
  left: 30px;
  top: 50px;
  width: 100%;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.5);
  @media screen and (min-width: 768px) {
    left: 80px;
  }
  @media screen and (min-width: 1024px) {
    left: 50px;
    top: 70px;
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
