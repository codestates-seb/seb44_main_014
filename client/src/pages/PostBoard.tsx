import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PostForm from '../components/Board/PostBoard/PostForm.tsx';

const PostBoard = () => {
  const navigate = useNavigate();

  return (
    <PostBoardContainer>
      <PostBoardTop>
        <PostBoardH2>게시글 작성</PostBoardH2>
        <CloseButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </PostBoardTop>
      {/* form 컴포넌트 */}
      <PostForm />
    </PostBoardContainer>
  );
};

const PostBoardContainer = styled.section`
  width: 100%;
  padding: 3.125rem 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 5rem 3.125rem;
  }
`;

const PostBoardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostBoardH2 = styled.h2`
  font-family: 'NanumSquare', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  @media screen and (min-width: 1024px) {
    font-size: 1.25rem;
  }
`;

const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  @media screen and (min-width: 1024px) {
    display: none;
  }
`;

export default PostBoard;
