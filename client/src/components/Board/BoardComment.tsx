import { styled } from 'styled-components';
import Comment from './Comment.tsx';

const BoardComment = () => {
  return (
    <CommentSection>
      <TitleH3>댓글</TitleH3>
      <CommentForm>
        <textarea placeholder="댓글을 작성해주세요." max-length={100} />
        <button type="submit">작성</button>
      </CommentForm>
      <ul>
        <Comment />
      </ul>
    </CommentSection>
  );
};

const CommentSection = styled.section`
  margin-top: 2rem;
`;

const TitleH3 = styled.h3`
  font-size: 0.875rem;
  margin-bottom: 0.625rem;
`;

const CommentForm = styled.form`
  padding-bottom: 0.625rem;
  textarea {
    width: 100%;
    padding: 1.25rem;
    border-radius: 5px;
    border: 1px solid var(--color-gray);
    box-sizing: border-box;
  }
  button {
    display: block;
    margin-top: 0.625rem;
    margin-left: auto;
    padding: 5px;
    background-color: #b3b3b3;
    border-radius: 5px;
    color: #ffffff;
    font-size: 13px;
    &:hover {
      background-color: var(--color-orange);
    }
  }
`;

export default BoardComment;
