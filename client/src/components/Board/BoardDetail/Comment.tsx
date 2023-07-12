import { useState } from 'react';
// import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { IComments } from '../../../interface/board.tsx';
import { timeStamp } from '../../../util/commonFunction.ts';

type CommentInfoProps = {
  commentInfo: IComments;
};

const Comment = ({ commentInfo }: CommentInfoProps) => {
  const { name, content, createdAt, avgStarRate, memberId /*, commemtId*/ } = commentInfo;

  const [modifyComment, setModifyComment] = useState(false);
  const [commentContent, setCommentContent] = useState({
    memberId: memberId,
    content: content,
  });

  // const params = useParams();
  // const postId = Number(params.postId);

  const newTime = timeStamp(new Date(createdAt));

  // 임시 사용자 id
  const userId = 1;

  const patchComment = () => {
    // axios
    //   .patch(`${process.env.REACT_APP_API_URL}/board/posts/${postId}/comments/${commemtId}`, commentContent)
    //   .then((res) => {
    //     console.log(res);
    //     setCommentContent({ ...commentContent, content: res.content });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const deleteComment = () => {
    // axios
    //   .delete(`${process.env.REACT_APP_API_URL}/board/posts/${postId}/comments/${commemtId}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <CommentList>
      <WriterInfo>
        <div>
          <WriterId>{name}</WriterId>
          <WriterScore>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> {avgStarRate}
          </WriterScore>
        </div>
        <CommentTime>{newTime}</CommentTime>
      </WriterInfo>
      {/* 기본 */}

      {!modifyComment && (
        <div>
          <CommentContent>{commentContent.content}</CommentContent>
          {/* TODO: 작성자에게만 노출 */}
          {/* 사용자, 작성자 memberId 비교 분기 처리 */}
          {userId === memberId && (
            <ModifyButtons>
              <button onClick={() => setModifyComment(!modifyComment)}>수정</button>
              <button onClick={() => deleteComment()}>삭제</button>
            </ModifyButtons>
          )}
        </div>
      )}
      {/* 수정 모드 */}
      {modifyComment && (
        <div>
          <CommentTextbox
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setCommentContent({ ...commentContent, content: (e.target as HTMLTextAreaElement).value });
              console.log(commentContent);
            }}
            value={commentContent.content}
            placeholder="댓글을 작성해주세요."
            max-length={100}
          />
          <ModifyButtons>
            {/* patch 요청 함수 연결 */}
            <button
              onClick={() => {
                setModifyComment(!modifyComment);
                patchComment();
              }}
            >
              저장
            </button>
          </ModifyButtons>
        </div>
      )}
    </CommentList>
  );
};

const CommentList = styled.li`
  margin-top: 0.625rem;
  padding: 1rem;
  background-color: var(--color-white);
  border-radius: 10px;
`;

const WriterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.625rem;
  font-size: 13px;
`;

const WriterId = styled.span`
  color: var(--color-black);
`;

const WriterScore = styled.span`
  margin-left: 0.875rem;
  color: var(--color-black);
  svg {
    margin-right: 5px;
  }
`;

const CommentTime = styled.span`
  color: var(--color-black);
`;

const CommentContent = styled.p`
  font-size: 0.875rem;
`;

const ModifyButtons = styled.div`
  margin-top: 0.625rem;
  display: flex;
  justify-content: flex-end;
  font-size: 13px;
  button {
    margin-left: 1rem;
    color: var(--color-black);
  }
`;

const CommentTextbox = styled.textarea`
  width: 100%;
  padding: 1.25rem;
  border-radius: 5px;
  border: 1px solid var(--color-gray);
  box-sizing: border-box;
`;

export default Comment;
