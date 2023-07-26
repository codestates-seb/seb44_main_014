import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';

import instance from '../util/api/instance.ts';
// import api from '../util/api/api.tsx';
import BoardList from './Board/BoardList.tsx';
import NoBoardList from './Board/NoBoardList.tsx';
import MainListArea from './MainListArea.tsx';

import { category } from '../store/listCategorySlice.ts';
import { IBoardList } from '../interface/board.ts';
import { ILocationState } from '../store/locationSlice.ts';
import { IUserState } from '../store/userSlice.ts';
import { FOOD_TAGS } from '../constant/constant.ts';

const AfterLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lists, setLists] = useState<IBoardList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const address = useSelector((state: ILocationState) => state.location.address);
  const foodTag = useSelector((state: IUserState) => state.user.foodTagId);

  let userFoodTag: number;
  if (!foodTag) {
    userFoodTag = 1;
  } else {
    userFoodTag = foodTag;
  }

  const customTagListTitle = FOOD_TAGS.filter((tag) => tag.id === userFoodTag)[0].text;

  useEffect(() => {
    const getBoarList = async () => {
      await instance
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

  const handleMoreCustomList = () => {
    navigate('/board');
  };

  const handleMoreEatingList = () => {
    navigate('/board');
    dispatch(category('EATING'));
  };

  const handleMoreShoppingList = () => {
    navigate('/board');
    dispatch(category('SHOPPING'));
  };

  return (
    <>
      <LocationText>
        <p>{address}</p>
      </LocationText>
      <BannerSection>
        <BannerTitle>같이 밥 먹을 친구 / 장 볼 친구를 찾아보세요!</BannerTitle>
      </BannerSection>
      <ListSection>
        <MainListArea
          title={`사용자 맞춤 게시글: ${customTagListTitle}`}
          moreBtnHandler={handleMoreCustomList}
          isLoading={isLoading}
        >
          <ul>
            {lists.filter((list) => list.postTag.foodTagId === userFoodTag).length === 0 && <NoBoardList />}
            {lists
              .filter((list) => list.postTag.foodTagId === userFoodTag)
              .slice(0, 4)
              .map((list, idx) => (
                <BoardList key={idx} list={list} />
              ))}
          </ul>
        </MainListArea>
        <MainListArea title={'밥 먹기 최신 글'} moreBtnHandler={handleMoreEatingList} isLoading={isLoading}>
          <ul>
            {lists.filter((list) => list.category === 'EATING').length === 0 && <NoBoardList />}
            {lists
              .filter((list) => list.category === 'EATING')
              .slice(0, 4)
              .map((list, idx) => (
                <BoardList key={idx} list={list} />
              ))}
          </ul>
        </MainListArea>
        <MainListArea title={'장 보기 최신 글'} moreBtnHandler={handleMoreShoppingList} isLoading={isLoading}>
          <ul>
            {lists.filter((list) => list.category === 'SHOPPING').length === 0 && <NoBoardList />}
            {lists
              .filter((list) => list.category === 'SHOPPING')
              .slice(0, 4)
              .map((list, idx) => (
                <BoardList key={idx} list={list} />
              ))}
          </ul>
        </MainListArea>
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
  left: 0;
  top: 50px;
  width: 100%;
  padding: 0.5rem 0;
  background-color: rgba(0, 0, 0, 0.5);
  @media screen and (min-width: 1024px) {
    top: 70px;
    padding: 0.8rem 0;
  }
  p {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 30px;
    color: #ffffff;
    font-family: 'NanumSquare', sans-serif;
    font-size: 0.875rem;
    @media screen and (min-width: 768px) {
      padding: 0 80px;
    }
    @media screen and (min-width: 1024px) {
      padding: 0 50px;
      font-size: 1rem;
    }
  }
`;

const BannerTitle = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  @media screen and (min-width: 768px) {
    font-size: 2rem;
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

export default AfterLogin;
