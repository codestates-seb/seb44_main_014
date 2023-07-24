import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
// import Tagcheckbox from '../components/UI/Tagcheckbox.tsx';
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
        commentId: 1,
        content: '',
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
  const [foodTagName, setFoodTagName] = useState('# 한식');
  const [meetingTitle, setMeetingTitle] = useState('참여 중인 모임이 없습니다.');
  const [meetingMates, setMeetingMates] = useState('참여자가 없습니다.');
  const [posts, setPosts] = useState('작성한 게시글이 없습니다.');
  const [comments, setComments] = useState('작성한 댓글이 없습니다.');
  const [userImage, setUserImage] = useState('');
  const [eatStatus, setEatStatus] = useState(false);

  const userFoodTag = (data: any) => {
    if (data.foodTag.foodTagId === 1) {
      setFoodTagName('# 한식');
    } else if (data.foodTag.foodTagId === 2) {
      setFoodTagName('# 중식');
    } else if (data.foodTag.foodTagId === 3) {
      setFoodTagName('# 일식');
    } else if (data.foodTag.foodTagId === 4) {
      setFoodTagName('# 양식');
    } else {
      setFoodTagName('기타');
    }
  };

  const userMeeting = (data: any) => {
    if (data.mates[0].postId === 1) {
      setMeetingTitle(data.mates[0].title);
      setMeetingMates(`참여자: ${data.mates[0].mateMembers[0].name}`);
    }
  };

  const userPosts = (data: any) => {
    if (data.posts[0].postId != 0) {
      setPosts(data.posts[0].title);
    }
  };

  const userComments = (data: any) => {
    if (data.comments[0].commentId != 0) {
      setComments(data.comments[0].content);
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/users/mypage/${userId}`, {
        headers: { Authorization: getCookie('accessToken') },
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
        userFoodTag(res.data);
        userMeeting(res.data);
        userPosts(res.data);
        userComments(res.data);
        setUserImage(res.data.image);
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

  // const dataComments = ({ user: any }) => {
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

  // 토글
  const [isOn, setIsOn] = useState(true);

  const ToggleHandler = () => {
    setIsOn(!isOn);
    axios.patch(`${import.meta.env.VITE_APP_API_URL}/users/mypage/${userId}?eatStatus=${isOn}`, {
      headers: { Authorization: getCookie('accessToken') },
    });
  };

  return (
    <BodyContainer>
      <UserProfileContainer>
        <UserImageContainer>
          {userImage != '' ? (
            <UserImage style={{ backgroundImage: `url(${userImage})` }}></UserImage>
          ) : (
            <UserImage style={{ background: `#000` }}></UserImage>
          )}
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
              <div>{foodTagName}</div>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Quite'}>조용히 밥만 먹어요</UserInfoTitle>
              <ToggleContainer onClick={ToggleHandler} isOn={isOn}>
                <ToggleBtn />
              </ToggleContainer>
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
              <div>{meetingTitle}</div>
            </UserContentsBoxTitle>
            <UserContentsBoxParagraph>
              <div>{meetingMates}</div>
            </UserContentsBoxParagraph>
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
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <div>{posts}</div>
              </UserContentsBoxTitle>
            </UserContentsContainer>
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
          <UserContents>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <div>{comments}</div>
              </UserContentsBoxTitle>
            </UserContentsContainer>
          </UserContents>
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

const UserContentsBoxTitle = styled.div`
  margin-bottom: 15px;
  font-size: 16px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const UserContentsBoxParagraph = styled.div`
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

// 토글

const ToggleContainer = styled.button<{ isOn: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.isOn ? 'flex-start' : 'flex-end')};
  align-items: center;
  z-index: 0;
  width: 45px;
  height: 24px;
  background: ${(props) => (props.isOn ? 'var(--color-gray)' : 'var(--color-orange)')};
  border: 1px solid;
  border-color: ${(props) => (props.isOn ? 'var(--color-gray)' : 'var(--color-orange)')};
  border-radius: 1.25rem;
`;

const ToggleBtn = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
`;

export default Mypage;
