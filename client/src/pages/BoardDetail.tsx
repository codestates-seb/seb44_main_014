import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
// components
import BoardDetailHeader from '../components/Board/BoardDetail/BoardDetailHeader.tsx';
import ApplyParticipate from '../components/Board/BoardDetail/ApplyParticipate.tsx';
import WriterProfile from '../components/Board/BoardDetail/WriterProfile.tsx';
import BoardComment from '../components/Board/BoardDetail/BoardComment.tsx';
// DUMMY DATA
import { BOARD_DETAIL } from '../data/boardDummyData.ts';
import { IBoardDetailData } from '../interface/board.tsx';

const BoardDetail = () => {
  const params = useParams();
  const postId = Number(params.postId);
  const [detailData, setDetailData] = useState<IBoardDetailData>(BOARD_DETAIL);

  const { content, mate, mateMembers, member, comments } = detailData;
  // const [updateMate, setUpdateMate] = useState({
  //   mate: mate,
  //   mateMembers: mateMembers,
  // });

  // 임시 사용자 id
  const userId = 3;

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
          <ApplyParticipate
            mate={mate}
            mateMembers={mateMembers}
            postApplyData={postApplyData}
            getDetailData={getDetailData}
          />
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

export default BoardDetail;
