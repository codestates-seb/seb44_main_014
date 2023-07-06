import { styled } from 'styled-components';
import Comment from './Comment.tsx';

const BoardComment = () => {
  return (
    <CommentSection>
      <CommentForm>
        <CommentTopArea>
          <TitleH3>댓글</TitleH3>
          <CommentButton type="submit">작성</CommentButton>
        </CommentTopArea>
        <textarea placeholder="댓글을 작성해주세요." max-length={100} />
      </CommentForm>
      <ul>
        <Comment />
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
