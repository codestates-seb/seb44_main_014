import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IUserState } from '../store/userSlice.ts';
import instance from '../util/api/instance.ts';
import { IMateMember } from '../interface/board.ts';
import Loading from '../components/UI/Loading.tsx';

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

interface Meetings {
  mateId: number;
  postId: number;
  title: string;
  mateMembers: IMateMember[];
  postMemberId: number;
  postMemberName: string;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [meetings, setMeetings] = useState<Meetings[]>([]);
  const [isOn, setIsOn] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await instance
        .get(`/users/mypage/${userId}`)
        .then((res: any) => {
          const mates: Meetings[] = res.data.mates;
          const postMates: Meetings[] = res.data.postMates;
          const mergedArray: Meetings[] = [...mates, ...postMates];
          mergedArray.sort((a, b) => b.postId - a.postId);
          setUserData(res.data);
          userFoodTag(res.data);
          userPosts(res.data);
          userComments(res.data);
          setUserImage(res.data.image);
          setIsOn(res.data.eatStatus);
          setMeetings(mergedArray);
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ToggleHandler = async () => {
    setIsOn(!isOn);
    try {
      // const axiosInstance = await api(); // Resolve the promise to get the Axios instance
      await instance.patch(`/users/mypage/${userId}?eatStatus=${!isOn}`);
    } catch (err) {
      console.log(err);
    }
  };

  const userFoodTag = (data: any) => {
    if (data.foodTag.foodTagId === 1) {
      setFoodTagName('# 한식');
    } else if (data.foodTag.foodTagId === 2) {
      setFoodTagName('# 중식');
    } else if (data.foodTag.foodTagId === 3) {
      setFoodTagName('# 양식');
    } else if (data.foodTag.foodTagId === 4) {
      setFoodTagName('# 일식');
    } else {
      setFoodTagName('# 기타');
    }
  };

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

  const userPosts = (data: any) => {
    if (Array.isArray(data.posts) && data.posts.length !== 0) {
      setPosts(data.posts);
    }
  };

  const userComments = (data: any) => {
    if (Array.isArray(data.comments) && data.comments.length !== 0) {
      setComments(data.comments);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && (
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
                  <UserInfolist>{userData.name}</UserInfolist>
                </UserContentsContainer>
                <UserContentsContainer className={'InfoContainer'}>
                  <UserInfoTitle>이메일</UserInfoTitle>
                  <UserInfolist>{userData.email}</UserInfolist>
                </UserContentsContainer>
                <UserContentsContainer className={'InfoContainer'}>
                  <UserInfoTitle>매너 별점</UserInfoTitle>
                  <UserInfolist>{userData.avgStarRate.toFixed(1)}</UserInfolist>
                </UserContentsContainer>
                <UserContentsContainer className={'Tag'}>
                  <UserInfoTitle className={'Tag'}>태그</UserInfoTitle>
                  <div>{foodTagName}</div>
                </UserContentsContainer>
                <UserContentsContainer className={'InfoContainer'}>
                  <UserInfoTitle className={'Quite'}>조용히 밥만 먹어요</UserInfoTitle>
                  <ToggleContainer className={'switch'}>
                    <input type="checkbox" name="toggle" onClick={ToggleHandler} defaultChecked={isOn} />
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
                {meetings.length === 0 && <p>참여 중인 모임이 없습니다.</p>}
                {meetings.map((meeting) => (
                  <UserContentsContainer key={meeting.postId}>
                    <UserContents className={'MeetingContents'}>
                      <UserContentsBoxTitle>
                        <Link to={`/board/posts/${meeting.postId}`}>{meeting.title}</Link>
                      </UserContentsBoxTitle>
                      <UserInfoul>
                        <UserInfolist className={'meetingList'}>참여자:</UserInfolist>
                        {meeting.mateMembers.map((member) => (
                          <UserInfolist key={member.mateMemberId} className={'meetingList'}>
                            {member.name}
                          </UserInfolist>
                        ))}
                      </UserInfoul>
                    </UserContents>
                  </UserContentsContainer>
                ))}
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
                {posts.length === 0 && <p>작성한 게시글이 없습니다.</p>}
                {posts.map((post) => (
                  <UserContentsContainer key={post.postId}>
                    <UserContentsBoxTitle>
                      <Link to={`/board/posts/${post.postId}`}>{post.title}</Link>
                    </UserContentsBoxTitle>
                    <ContentStatus>{statusTextChange(post.status)}</ContentStatus>
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
                {comments.length === 0 && <p>작성한 댓글이 없습니다.</p>}
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
      )}
    </div>
  );
};

const BodyContainer = styled.div`
  margin: 50px;
  min-height: 1000px;

  @media (max-width: 1024px) {
    margin-top: 20px;
  }
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

  @media (max-width: 1024px) {
    width: 200px;
    height: 200px;
  }
`;

const UserImage = styled.img`
  width: 250px;
  height: 250px;
  padding: 50px;
  border-radius: 50%;

  @media (max-width: 1024px) {
    width: 220px;
    height: 220px;
  }
`;

const UserInfoContainer = styled.div`
  margin: auto;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;

  @media (max-width: 1024px) {
    max-width: 37.5rem;
  }
  @media (max-width: 768px) {
    max-width: 19.6875rem;
  }
  @media (min-width: 1026px) {
    width: 68.125rem;
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

const UserInfoul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

const UserInfolist = styled.li`
  margin-left: 1.875rem;
  font-size: 0.9375rem;

  &.meetingList {
    margin-left: 0;
    margin-right: 0.9375rem;

    @media (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

const UserContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;

  &.MeetingContainer {
    @media (max-width: 1024px) {
      margin-top: 240px;
    }
  }
  &.PostsContainer {
    margin-top: 60px;
    margin-bottom: 10px;
  }
`;

const UserContentsTitle = styled.h1`
  padding-left: 10px;
  margin-bottom: 10px;
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
    min-height: 100px;
  }
  &.PostsBox {
    min-height: 100px;
  }
`;

const UserContents = styled.div`
  padding: 20px;

  &.InfoContents {
    padding: 20px 20px 10px;
  }
  &.MeetingContents {
    padding: 0;
  }
`;

const UserContentsBoxTitle = styled.div`
  margin-bottom: 15px;
  font-size: 16px;

  @media (max-width: 1024px) {
    margin-bottom: 15px;
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

const ContentStatus = styled.div`
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px;
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
