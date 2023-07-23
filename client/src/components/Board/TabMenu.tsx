import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faWheatAwn } from '@fortawesome/free-solid-svg-icons';

import { IFilterInfo } from '../../interface/board.ts';

interface IStyledProps {
  $isActive: boolean;
}

interface ITabMenuProps {
  filterInfo: IFilterInfo;
  setFilterInfo: React.Dispatch<React.SetStateAction<IFilterInfo>>;
  setCurrentApi: React.Dispatch<React.SetStateAction<string>>;
}

const TabMenu = ({ filterInfo, setFilterInfo, setCurrentApi }: ITabMenuProps) => {
  const handleClickEating = (e: React.MouseEvent<HTMLElement>) => {
    setCurrentApi(`&category=${(e.target as HTMLButtonElement).value}`);
    setFilterInfo({
      ...filterInfo,
      page: 1,
      category: (e.target as HTMLButtonElement).value,
      genderTag: null,
      foodTag: null,
    });
  };

  const handleClickShopping = (e: React.MouseEvent<HTMLElement>) => {
    setCurrentApi(`&category=${(e.target as HTMLButtonElement).value}`);
    setFilterInfo({
      ...filterInfo,
      page: 1,
      category: (e.target as HTMLButtonElement).value,
      genderTag: null,
      foodTag: null,
    });
  };

  return (
    <TabMenuArea>
      <TabButton
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          handleClickEating(e);
        }}
        $isActive={filterInfo.category === 'EATING' ? true : false}
        value="EATING"
      >
        <FontAwesomeIcon icon={faUtensils} /> 밥 먹기
      </TabButton>
      <TabButton
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          handleClickShopping(e);
        }}
        $isActive={filterInfo.category === 'SHOPPING' ? true : false}
        value="SHOPPING"
      >
        <FontAwesomeIcon icon={faWheatAwn} /> 장 보기
      </TabButton>
    </TabMenuArea>
  );
};

const TabMenuArea = styled.nav`
  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    width: 200px;
    padding-top: 3.125rem;
    border-right: 1px solid var(--color-gray);
  }
`;

const TabButton = styled.button<IStyledProps>`
  width: 50%;
  height: 2.5rem;
  background-color: ${(props) => (props.$isActive ? '#F0930D' : '#F4F2EF')};
  color: ${(props) => (props.$isActive ? '#ffffff' : '#000000')};
  @media screen and (min-width: 1024px) {
    width: 100%;
    height: 2.5rem;
  }
`;

export default TabMenu;
