import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// components
import BoardComment from '../components/Board/BoardComment.tsx';
import WriterProfile from '../components/Board/WriterProfile.tsx';
import BoardDetailHeader from '../components/Board/BoardDetailHeader.tsx';
// DUMMY DATA
import { BOARD_DETAIL } from '../data/boardDummyData.ts';

interface IMateMember {
  mateMemberId: number;
  name: string;
}

export interface IComments {
  commentId: number;
  content: string;
  memberId: number;
  avgStarRate: number;
  name: string;
  createdAt: string;
}

export interface IDetailData {
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  viewCount: number;
  commentCount: number;
  status: string;
  category: string;
  member: {
    memberId: number;
    image: string;
    name: string;
    gender: string;
    avgStarRate: number;
    eatStatus: boolean;
  };
  postTag: {
    postTagId: number;
    foodTagId: number;
    genderTagId: number;
  };
  genderTag: {
    genderTagId: number;
  };
  foodTag: {
    foodTagId: number;
  };
  mate: {
    findNum: number;
    mateNum: number;
  };
  mateMembers: IMateMember[];
  comments: IComments[];
}

const BoardDetail = () => {
  const params = useParams();
  const postId = Number(params.postId);
  const [detailData, setDetailData] = useState<IDetailData>(BOARD_DETAIL);

  const { content, mate, mateMembers, member, comments } = detailData;
  // const [updateMate, setUpdateMate] = useState({
  //   mate: mate,
  //   mateMembers: mateMembers,
  // });

  // 임시 사용자 id
  const userId = 3;

  const showParticipant = mateMembers.filter((member) => member.mateMemberId === userId).length;

  useEffect(() => {
    getDetailData();
  }, []);

  const getDetailData = () => {
    setDetailData(BOARD_DETAIL);
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/board/posts/${postId}`)
    //   .then((res) => {
    //     console.log(res);
    //     setDetailData(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  // const applyData = {
  //   memberId: 1, //사용자 멤버 아이디
  // };

  const postApplyData = () => {
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/board/posts/${postId}/mate`, applyData)
    //   .then((res) => {
    //     console.log(res)
    //     setUpdateMate({...updateMate, mate: res.mate})
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const deletePost = () => {
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/board/posts/${postId}`)
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <DetailContainer>
      {/* 상단 정보 영역 */}
      <BoardDetailHeader boardInfo={detailData} />
      <ContentsSection>
        <ContentsWrapper>
          {/* 내용 영역 */}
          <TextContainer>
            <TextArea>{content}</TextArea>
            {userId === member.memberId && (
              <ModifyButtons>
                <Link to={`/board/posts/${postId}/edit`}>수정</Link>
                <button type="button" onClick={() => deletePost()}>
                  삭제
                </button>
              </ModifyButtons>
            )}
          </TextContainer>
          {/* 참가 신청 영역 */}
          <ParticipantContainer>
            <ApplyParticipate>
              모집인원
              <span>
                {mate.findNum} / {mate.mateNum}
              </span>
              <button
                type="button"
                onClick={() => {
                  postApplyData();
                  getDetailData();
                }}
              >
                신청
              </button>
            </ApplyParticipate>
            {showParticipant !== 0 && (
              <ParticipantId>
                <span>참가자: &nbsp;</span>
                {mateMembers.map((member, idx) => (
                  <span key={idx}>&nbsp; {member.name}</span>
                ))}
              </ParticipantId>
            )}
          </ParticipantContainer>
        </ContentsWrapper>
        {/* 작성자 프로필 영역 */}
        <WriterProfile profileInfo={member} />
      </ContentsSection>
      {/* 댓글 영역 */}
      <BoardComment commentInfo={comments} />
    </DetailContainer>
  );
};

const DetailContainer = styled.section`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 40px 80px;
  }
  @media screen and (min-width: 1024px) {
    padding: 50px;
  }
`;

const ContentsSection = styled.section`
  @media screen and (min-width: 1024px) {
    display: flex;
    align-items: flex-start;
  }
`;

const ContentsWrapper = styled.div`
  @media screen and (min-width: 1024px) {
    width: calc(100% - 220px);
  }
`;

// 본문 내용 영역
const TextContainer = styled.section`
  padding-top: 1.875rem;
`;

const TextArea = styled.div`
  padding: 1.25rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.5;
`;

const ModifyButtons = styled.div`
  margin-top: 1.25rem;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  a,
  button {
    margin-left: 1rem;
    color: var(--color-black);
  }
`;

// 참가 신청 영역
const ParticipantContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.25rem;
`;

const ApplyParticipate = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
  font-size: 13px;
  span {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
  button {
    margin-right: 1.25rem;
    padding: 5px;
    background-color: #b3b3b3;
    border-radius: 5px;
    color: #ffffff;
    &:hover {
      background-color: var(--color-orange);
    }
  }
`;

const ParticipantId = styled.div`
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 13px;
  span {
    color: var(--color-black);
  }
`;

export default BoardDetail;
