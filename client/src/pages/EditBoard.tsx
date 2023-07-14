import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EditForm from '../components/Board/EditBoard/EditForm.tsx';

const EditBoard = () => {
  const navigate = useNavigate();
  return (
    <EditBoardContainer>
      <EditBoardTop>
        <EditBoardH2>게시글 작성</EditBoardH2>
        <CloseButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </EditBoardTop>
      {/* form 컴포넌트 */}
      <EditForm />
    </EditBoardContainer>
  );
};
const EditBoardContainer = styled.section`
  width: 100%;
  padding: 3.125rem 1.875rem;
  @media screen and (min-width: 768px) {
    padding: 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 5rem 3.125rem;
  }
`;

const EditBoardTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditBoardH2 = styled.h2`
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
export default EditBoard;
