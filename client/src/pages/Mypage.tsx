import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
// import Tag from '../components/UI/Tag.tsx';
// import Toggle from '../components/UI/Toggle.tsx';
import { IUserState } from '../store/userSlice.ts';
import axios from 'axios';
import { getCookie } from '../util/cookie/index.ts';

const Mypage = () => {
  const [userData, setUserData] = useState({
    image: '',
    name: '',
    email: '',
    avgStarRate: 0,
    foodTag: {
      foodTagId: 1,
    },
    eatStatus: '',
    posts: [
      {
        postId: 1,
        title: '',
        status: '',
      },
    ],
    comments: [
      {
        postId: 1,
        title: '',
        status: '',
      },
    ],
    postMates: [
      {
        mateId: 1,
        postId: 1,
        title: '',
        mateMembers: [
          {
            memberId: 1,
            name: '',
          },
        ],
      },
    ],
    mates: [
      {
        mateId: 1,
        postId: 1,
        title: '',
        mateMembers: [
          {
            memberId: 1,
            name: '',
          },
        ],
      },
    ],
  });

  const userId = useSelector((state: IUserState) => state.user.memberId);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/users/mypage/${userId}`, {
        headers: { Authorization: getCookie('accessToken') },
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const userPosts = ({ user: any }) => {
  //   return (
  //     <div key={user.posts.postId}>
  //       <UserContentsBoxTitle>
  //         <Link to="/board">{user.posts.title}</Link>
  //       </UserContentsBoxTitle>
  //       <UserContentsBoxParagraph>{user.posts.status}</UserContentsBoxParagraph>
  //     </div>
  //   );
  // };

  // const userComments = ({ user: any }) => {
  //   return (
  //     <div key={user.posts.commentId}>
  //       <UserContentsContainer>
  //         <UserContentsBoxTitle>
  //           <Link to="/board">{user.comments.content}</Link>
  //         </UserContentsBoxTitle>
  //       </UserContentsContainer>
  //     </div>
  //   );
  // };

  return (
    <BodyContainer>
      <UserProfileContainer>
        <UserImageContainer>
          <UserImage></UserImage>
        </UserImageContainer>
        <UserInfoContainer>
          <UserContents className={'InfoContents'}>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>이름</UserInfoTitle>
              <UserInfoParagraph>{userData.name}</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>이메일</UserInfoTitle>
              <UserInfoParagraph>{userData.email}</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>매너 별점</UserInfoTitle>
              <UserInfoParagraph>{userData.avgStarRate}</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'Tag'}>
              <UserInfoTitle className={'Tag'}>태그</UserInfoTitle>
              {/* <Tag className={'Tag'}>4.6</Tag> */}
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Quite'}>조용히 밥만 먹어요</UserInfoTitle>
              {/* <Toggle>4.6</Toggle> */}
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Edit'}>
                <Link to="/users/mypage/:memberId/edit">프로필 수정</Link>
              </UserInfoTitle>
            </UserContentsContainer>
          </UserContents>
        </UserInfoContainer>
      </UserProfileContainer>
      <UserContainer className={'MeetingContainer'}>
        <UserContentsTitle>참여 중인 모임</UserContentsTitle>
        <UserContentBox className={'MeetingBox'}>
          <UserContents>
            <UserContentsBoxTitle>
              <Link to="/board"></Link>
            </UserContentsBoxTitle>
            <UserContentsBoxParagraph></UserContentsBoxParagraph>
          </UserContents>
        </UserContentBox>
      </UserContainer>
      <UserContainer className={'PostsContainer'}>
        <UserContentsContainer>
          <UserContentsTitle>작성한 게시글</UserContentsTitle>
          <Link to="/users/mypage/:memberId/questions">
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
        <UserContentBox className={'PostsBox'}>
          <UserContents>
            <UserContentsContainer>{/*{userData.map(userPosts)}*/}</UserContentsContainer>
          </UserContents>
        </UserContentBox>
      </UserContainer>
      <UserContainer className={'PostsContainer'}>
        <UserContentsContainer>
          <UserContentsTitle>작성한 댓글</UserContentsTitle>
          <Link to="/users/mypage/:memberId/comments">
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
        <UserContentBox className={'PostsBox'}>
          {/* <UserContents>{userData.map(userComments)}</UserContents> */}
        </UserContentBox>
      </UserContainer>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  margin: 3.125rem;
  min-height: 1000px;
`;

const UserProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 20.625rem;
  margin-bottom: 80px;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const UserImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: auto;
  width: 20.625rem;
  height: 20.625rem;
`;

const UserImage = styled.div`
  width: 250px;
  height: 250px;
  padding: 50px;
  background: black;
  border-radius: 50%;
`;

const UserInfoContainer = styled.div`
  width: 1090px;
  height: 350px;
  margin: auto;
  border: 1px solid var(--color-gray);
  border-radius: 10px;

  @media (max-width: 1024px) {
    max-width: 37.5rem;
  }
  @media (max-width: 768px) {
    max-width: 19.6875rem;
  }
`;

const UserInfoTitle = styled.h1`
  display: flex;
  width: 70px;
  margin-bottom: 30px;
  font-size: 16px;

  &.Tag {
    width: 100%;
    margin-bottom: 10px;
  }
  &.Quite {
    align-items: center;
    width: 150px;
    height: 24px;
  }
  &.Edit {
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 0;
  }
`;

const UserInfoParagraph = styled.p`
  margin-left: 30px;
  font-size: 15px;
`;

const UserContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;

  &.MeetingContainer {
    height: 120px;

    @media (max-width: 1024px) {
      margin-top: 25rem;
    }
  }
  &.PostsContainer {
    height: 160px;
  }
`;

const UserContentsTitle = styled.h1`
  padding-left: 10px;
  padding-bottom: 10px;
  height: 30px;
  font-size: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 0;
    font-size: 16px;
  }
`;

const UserContentBox = styled.div`
  border: 1px solid var(--color-gray);
  border-radius: 10px;

  &.MeetingBox {
    height: 90px;
  }
  &.PostsBox {
    height: 130px;
  }
`;

const UserContents = styled.div`
  padding: 20px;

  &.InfoContents {
    padding: 30px;
  }
`;

const UserContentsBoxTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 16px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const UserContentsBoxParagraph = styled.p`
  color: var(--color-black);
  font-size: 14px;
  word-spacing: 10px;

  @media (max-width: 1024px) {
    font-size: 13px;
  }

  &.MoreInfoLink {
    margin-right: 20px;
    padding-top: 5px;
  }
`;

const UserContentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &.InfoContainer {
    justify-content: flex-start;
  }
  &.Tag {
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
`;

export default Mypage;
