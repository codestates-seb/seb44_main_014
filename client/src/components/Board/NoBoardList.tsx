import { styled } from 'styled-components';

const NoBoardList = () => {
  return (
    <ListContainer>
      <p>게시글이 없습니다.</p>
    </ListContainer>
  );
};

const ListContainer = styled.li`
  width: 100%;
  margin-bottom: 0.625rem;
  padding: 1rem;
  border: 1px solid var(--color-gray);
  border-radius: 8px;
  box-sizing: border-box;
  @media screen and (min-width: 1024px) {
    padding: 1.25rem;
    margin-bottom: 1.25rem;
  }
  p {
    padding: 2rem 0;
    text-align: center;
  }
`;
export default NoBoardList;
