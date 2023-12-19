import { styled } from 'styled-components';
import Loading from '../UI/Loading.tsx';

interface IMainListProps {
  children: React.ReactNode;
  title: string;
  moreBtnHandler: () => void;
  isLoading: boolean;
}

const MainListArea = ({ children, title, moreBtnHandler, isLoading }: IMainListProps) => {
  return (
    <ListBlock>
      <TitleArea>
        <TitleH3>{title}</TitleH3>
        <MoreButton
          onClick={() => {
            moreBtnHandler();
          }}
        >
          더 보기
        </MoreButton>
      </TitleArea>
      {isLoading ? <Loading /> : <>{children}</>}
    </ListBlock>
  );
};

const ListBlock = styled.li`
  margin-top: 3rem;
  @media screen and (min-width: 1024px) {
    margin-top: 5rem;
  }
`;

const TitleArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
  @media screen and (min-width: 768px) {
    margin-bottom: 1.875rem;
  }
  @media screen and (min-width: 1024px) {
  }
`;

const TitleH3 = styled.h3`
  padding-left: 1rem;
  font-family: 'NanumSquare', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const MoreButton = styled.button`
  padding-right: 1rem;
  font-size: 13px;
  @media screen and (min-width: 768px) {
  }
  @media screen and (min-width: 1024px) {
  }
`;

export default MainListArea;
