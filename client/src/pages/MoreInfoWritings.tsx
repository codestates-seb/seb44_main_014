import { styled } from 'styled-components';
import NoBoardList from '../components/Board/NoBoardList.tsx';
import { IMypagePosts } from '../interface/mypage.ts';
import { useState, useEffect } from 'react';
import { IUserState } from '../store/userSlice.ts';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import api from '../util/api/api.tsx';
import instance from '../util/api/instance.ts';

const MoreInfoWritings = () => {
  const [lists, setLists] = useState<IMypagePosts[]>([]);
  const memberId = useSelector((state: IUserState) => state.user.memberId);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusTextChange = (status: string) => {
    let statusText: string;
    // let statusColor: string;
    if (status === 'END') {
      statusText = '모집 종료';
      // statusColor = '#EE3D16';
    } else if (status === 'COMPLETE') {
      statusText = '모집 완료';
      // statusColor = '#FFD233';
    } else {
      statusText = '모집 중';
      // statusColor = '#28CA6B';
    }
    return statusText;
  };

  const getList = async () => {
    try {
      const response = await instance.get(`/users/mypage/${memberId}/posts`);
      setLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <WritingsContainer>
      <WritingsTitle>작성한 게시글</WritingsTitle>
      {lists.length === 0 && <NoBoardList />}
      {lists.map((list) => (
        <WritingContentsContainer key={list.postId}>
          <ContentsTitle>
            <Link to={`/board/posts/${list.postId}`}>{list.title}</Link>
          </ContentsTitle>
          <ContentsParagraph dangerouslySetInnerHTML={{ __html: list.content }} />
          <ContentsMetting>{statusTextChange(list.status)} </ContentsMetting>
        </WritingContentsContainer>
      ))}
    </WritingsContainer>
  );
};

const WritingsContainer = styled.div`
  min-height: calc(100% - 200px);
  margin: 50px;
`;

const WritingsTitle = styled.h1`
  height: 30px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const WritingContentsContainer = styled.div`
  position: relative;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const ContentsMetting = styled.p`
  position: absolute;
  top: 35px;
  right: 60px;
  font-size: 14px;
`;

export default MoreInfoWritings;
