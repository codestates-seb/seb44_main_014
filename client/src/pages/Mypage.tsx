import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IUserState } from '../store/userSlice.ts';
import authApi from '../util/api/authApi.tsx';
import { getCookie } from '../util/cookie/index.ts';
import NoBoardList from '../components/Board/NoBoardList.tsx';

interface Post {
  postId: number;
  title: string;
  status: string;
}

interface Comment {
  postId: number;
  commentId: number;
  content: string;
}

const Mypage = () => {
  const [userData, setUserData] = useState({
    image: '',
    name: '',
    email: '',
    avgStarRate: 0,
    foodTag: {
      foodTagId: 1,
    },
    eatStatus: false,
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [userImage, setUserImage] = useState('');

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
      setPosts(data.posts);
    }
  };

  const userComments = (data: any) => {
    if (data.comments[0].commentId != 0) {
      setComments(data.comments);
    }
  };
  const [isOn, setIsOn] = useState(false);
  const ToggleHandler = async () => {
    setIsOn(!isOn);
    try {
      const axiosInstance = await authApi; // Resolve the promise to get the Axios instance
      const response = await axiosInstance.patch(
        `/users/mypage/${userId}?eatStatus=${!isOn}`,
        {},
        {
          headers: { Authorization: getCookie('accessToken') },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const axiosInstance = await authApi; // Resolve the promise to get the Axios instance
        const res = await axiosInstance.get(`/users/mypage/${userId}`, {
          headers: { Authorization: getCookie('accessToken') },
        });
        console.log(res);
        setUserData(res.data);
        userFoodTag(res.data);
        userMeeting(res.data);
        userPosts(res.data);
        userComments(res.data);
        setUserImage(res.data.image);
        setIsOn(res.data.eatStatus);

        const toggleCheckboxes = document.getElementsByName('toggle');
        if (res.data.eatStatus === true) {
          for (let i = 0; i < toggleCheckboxes.length; i++) {
            const checkbox = toggleCheckboxes[i] as HTMLInputElement;
            checkbox.checked = true;
          }
        } else {
          for (let i = 0; i < toggleCheckboxes.length; i++) {
            const checkbox = toggleCheckboxes[i] as HTMLInputElement;
            checkbox.checked = false;
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 토글

  return (
    <BodyContainer>
      <UserProfileContainer>
        <UserImageContainer>
          {userImage != '' ? (
            <UserImage src={userImage} />
          ) : (
            <UserImage src="https://bobimage.s3.ap-northeast-2.amazonaws.com/member/defaultProfile.png" />
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
              <ToggleContainer className={'switch'}>
                <input type="checkbox" name="toggle" onClick={ToggleHandler} />
                <span className={'slider round'}></span>
              </ToggleContainer>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Edit'}>
                <Link to={`/users/mypage/${userId}/edit`}>프로필 수정</Link>
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
          <Link to={`/users/mypage/${userId}/questions`}>
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
      </UserContainer>
      <UserContainer>
        <UserContentBox className={'PostsBox'}>
          <UserContents>
            {posts.length === 0 && <NoBoardList />}
            {posts.map((post) => (
              <UserContentsContainer key={post.postId}>
                <UserContentsBoxTitle>
                  <Link to={`/board/posts/${post.postId}`}>{post.title}</Link>
                </UserContentsBoxTitle>
              </UserContentsContainer>
            ))}
          </UserContents>
        </UserContentBox>
      </UserContainer>
      <UserContainer className={'PostsContainer'}>
        <UserContentsContainer>
          <UserContentsTitle>작성한 댓글</UserContentsTitle>
          <Link to={`/users/mypage/${userId}/comments`}>
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
        <UserContentBox className={'PostsBox'}>
          <UserContents>
            {comments.length === 0 && <NoBoardList />}
            {comments.map((comment) => (
              <UserContentsContainer key={comment.postId}>
                <UserContentsBoxTitle>
                  <Link to={`/board/posts/${comment.postId}`}>{comment.content}</Link>
                </UserContentsBoxTitle>
              </UserContentsContainer>
            ))}
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

const UserImage = styled.img`
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
    height: 20px;
    margin-bottom: 10px;
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

const ToggleContainer = styled.label`
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;

    width: 60px;
    height: 34px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: var(--color-orange);
  }

  input:focus + .slider {
    box-shadow: 0 0 1px var(--color-orange);
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;

export default Mypage;
