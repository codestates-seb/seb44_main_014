import { useState } from 'react';
import { styled } from 'styled-components';
import Comment from './Comment.tsx';

import { IComments } from '../../pages/BoardDetail.tsx';

const BoardComment = ({ commentInfo }: IComments[]) => {
  const [commentContent, setCommentContent] = useState({
    memberId: 1, // 사용자 멤버 아이디
    content: '',
  });

  const postComment = () => {
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/board/posts/${postId}/comments/${commemtId}`, commentContent)
    //   .then((res) => {
    //     console.log(res);
    //     setCommentContent({ ...commentContent, content: res.content });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <CommentSection>
      <CommentForm onSubmit={postComment()}>
        <CommentTopArea>
          <TitleH3>댓글</TitleH3>
          <CommentButton type="submit">작성</CommentButton>
        </CommentTopArea>
        <textarea
          value={commentContent.content}
          onChange={(e) => {
            setCommentContent({ ...commentContent, content: e.target.value });
            console.log(commentContent);
          }}
          placeholder="댓글을 작성해주세요."
          max-length={100}
        />
      </CommentForm>
      <ul>
        {commentInfo.map((comment, idx) => (
          <Comment key={idx} commentInfo={comment} />
        ))}
      </ul>
    </CommentSection>
  );
};

const CommentSection = styled.section`
  margin-top: 2rem;
  @media screen and (min-width: 1024px) {
    width: calc(100% - 220px);
  }
`;

const CommentForm = styled.form`
  padding-bottom: 0.625rem;
  textarea {
    width: 100%;
    padding: 1.25rem;
    border-radius: 10px;
    border: 1px solid var(--color-gray);
    box-sizing: border-box;
  }
`;

const CommentTopArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.625rem;
`;

const TitleH3 = styled.h3`
  font-size: 0.875rem;
`;

const CommentButton = styled.button`
  display: block;
  margin-top: 0.625rem;
  padding: 5px;
  background-color: #b3b3b3;
  border-radius: 5px;
  color: #ffffff;
  font-size: 13px;
  &:hover {
    background-color: var(--color-orange);
  }
`;

export default BoardComment;
