import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import UserRateList from '../components/UserRateList.tsx';
import Loading from '../components/Loading.tsx';

const UserRating = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const [userLists, setUserLists] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/posts/${postId}/mate`)
      .then((res) => {
        setUserLists(res.data.mate_member);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserRateContainer>
      <ButtonClose onClick={() => navigate(`/board/posts/${postId}`)}>
        <FontAwesomeIcon icon={faXmark} />
      </ButtonClose>
      <Description>
        더 나은 밥친구 환경을 위해
        <br /> 소중한 평가 부탁드려요!
      </Description>
      <ul>
        {isLoading && <Loading />}
        {/* 사용자 별점 리스트 */}
        {userLists.map((list, idx) => (
          <UserRateList key={idx} list={list} />
        ))}
      </ul>
      <ButtonComplete onClick={() => navigate(`/board/posts/${postId}`)}>완료</ButtonComplete>
    </UserRateContainer>
  );
};

const UserRateContainer = styled.section`
  padding: 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 40px 80px;
  }
  @media screen and (min-width: 1024px) {
    padding: 50px;
  }
`;

const ButtonClose = styled.button`
  display: block;
  margin-left: auto;
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const Description = styled.p`
  margin-top: 1.25rem;
  text-align: center;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  line-height: 1.5;
`;

const ButtonComplete = styled.button`
  display: block;
  width: 286px;
  height: 2.5rem;
  margin: 2rem auto 0;
  background-color: var(--color-orange);
  color: #ffffff;
  font-size: 1rem;
  border-radius: 5px;
`;

export default UserRating;
