import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const Comment = () => {
  return (
    <CommentList>
      <WriterInfo>
        <div>
          <WriterId>마포호랑이</WriterId>
          <WriterScore>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> 4.6
          </WriterScore>
        </div>
        <span>2분 전</span>
      </WriterInfo>
      <CommentContent>저요!!!!!!!!!!!</CommentContent>
      {/* TODO: 작성자에게만 노출 */}
      <ModifyButtons>
        <button>수정</button>
        <button>삭제</button>
      </ModifyButtons>
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

export default Comment;
