import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import AlertPopup from '../../UI/AlertPopup.tsx';
import ProfilePopup from './ProfilePopup.tsx';
import { IComments } from '../../../interface/board.ts';
import { timeStamp, showModal } from '../../../util/common.ts';
import { IUserState } from '../../../store/userSlice.ts';
import api from '../../../util/api/api.tsx';

type CommentInfoProps = {
  commentInfo: IComments;
};

const Comment = ({ commentInfo }: CommentInfoProps) => {
  const { name, content, createdAt, avgStarRate, memberId, commentId, image, gender, eatStatus } = commentInfo;
  const userId = useSelector((state: IUserState) => state.user.memberId);
  const [modifyComment, setModifyComment] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState({
    memberId: memberId,
    content: content,
  });
  const [commentDeleteAlert, setCommentDeleteAlert] = useState<boolean>(false);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const profileInfo = { name, avgStarRate, memberId, image, gender, eatStatus };
  const params = useParams();
  const postId = Number(params.postId);

  const newTime = timeStamp(new Date(createdAt));

  const patchComment = async () => {
    (await api())
      .patch(`/board/posts/${postId}/comments/${commentId}`, commentContent)
      .then((res) => {
        setCommentContent({ ...commentContent, content: res.data.content });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteComment = async () => {
    (await api())
      .delete(`/board/posts/${postId}/comments/${commentId}`)
      .then(() => {
        location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {commentDeleteAlert && (
        <AlertPopup purpose={'삭제'} purposeHandler={deleteComment} closeHandler={setCommentDeleteAlert}>
          댓글을 삭제하시겠습니까?
        </AlertPopup>
      )}
      <CommentList>
        {showProfile && (
          <ProfilePopup className={'comment'} userInfo={profileInfo} handleShowProfile={setShowProfile} />
        )}
        <WriterInfo>
          <div>
            <WriterId onClick={() => setShowProfile(true)}>{name}</WriterId>
            <WriterScore>
              <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> {avgStarRate.toFixed(1)}
            </WriterScore>
          </div>
          <CommentTime>{newTime}</CommentTime>
        </WriterInfo>
        {/* 기본 */}

        {!modifyComment && (
          <div>
            <CommentContent>{commentContent.content}</CommentContent>
            {/* 작성자에게만 노출 */}
            {userId === memberId && (
              <ModifyButtons>
                <button onClick={() => setModifyComment(!modifyComment)}>수정</button>
                <button
                  onClick={() => {
                    setCommentDeleteAlert(true);
                    showModal();
                  }}
                >
                  삭제
                </button>
              </ModifyButtons>
            )}
          </div>
        )}
        {/* 수정 모드 */}
        {modifyComment && (
          <div>
            <CommentTextbox>
              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  setCommentContent({ ...commentContent, content: (e.target as HTMLTextAreaElement).value });
                }}
                value={commentContent.content}
                placeholder="댓글을 작성해주세요."
                max-length={100}
              />
            </CommentTextbox>
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
    </>
  );
};

const CommentList = styled.li`
  position: relative;
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

const CommentTextbox = styled.div`
  textarea {
    width: 100%;
    padding: 1.25rem;
    border-radius: 5px;
    border: 1px solid var(--color-gray);
    box-sizing: border-box;
  }
`;

export default Comment;
