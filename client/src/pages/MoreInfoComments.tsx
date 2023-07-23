import { styled } from 'styled-components';
import NoBoardList from '../components/Board/NoBoardList.tsx';
import { IMypageComments } from '../interface/mypage.ts';
import { useState, useEffect } from 'react';
import { IUserState } from '../store/userSlice.ts';
import { useSelector } from 'react-redux';
import authApi from '../util/api/authApi.tsx';

const MoreInfoComments = () => {
  const [lists, setLists] = useState<IMypagePosts>([]);
  const memberId = useSelector((state: IUserState) => state.user.memberId);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    const response = await (await authApi).get(`/users/mypage/${memberId}/comments`);
    setLists(response.data);
  };
  return (
    <WritingsContainer>
      <WritingsTitle>작성한 댓글</WritingsTitle>
      {lists.length === 0 && <NoBoardList />}
      {lists.map((list, idx) => (
        <WritingContentsContainer key={idx}>
          <ContentsTitle>{list.title}</ContentsTitle>
          <ContentsParagraph>{list.content}</ContentsParagraph>
        </WritingContentsContainer>
      ))}
    </WritingsContainer>
  );
};

const WritingsContainer = styled.div`
  height: 500px;
  margin: 50px;
`;

const WritingsTitle = styled.h1`
  height: 30px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const WritingContentsContainer = styled.div`
  height: 90px;
  border-top: 1px solid var(--color-gray);
  padding: 20px 60px;

  &:last-child {
    border-bottom: 1px solid var(--color-gray);
  }
`;

const ContentsTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const ContentsParagraph = styled.p`
  font-size: 14px;
`;

export default MoreInfoComments;
