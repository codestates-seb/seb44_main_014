import * as React from 'react';
import { styled } from 'styled-components';

import { IBoardList } from '../../interface/board.ts';

interface IStyledProps {
  $isActive: boolean;
}

interface ISortBtnProps {
  newer: boolean;
  setNewer: React.Dispatch<React.SetStateAction<boolean>>;
  mostViewed: boolean;
  setMostViewed: React.Dispatch<React.SetStateAction<boolean>>;
  lists: IBoardList[];
  setLists: React.Dispatch<React.SetStateAction<IBoardList[]>>;
}

const SortButtons = ({ newer, setNewer, mostViewed, setMostViewed, lists, setLists }: ISortBtnProps) => {
  const handleSortByDate = () => {
    setNewer(true);
    setMostViewed(false);
    setLists(
      lists.sort((a, b) => {
        if (a.createdAt > b.createdAt) {
          return -1;
        } else if (a.createdAt < b.createdAt) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  };

  const handleSortByViewed = () => {
    setNewer(false);
    setMostViewed(true);
    setLists(
      lists.sort((a, b) => {
        if (a.viewCount > b.viewCount) {
          return -1;
        } else if (a.viewCount < b.viewCount) {
          return 1;
        } else {
          return 0;
        }
      })
    );
  };

  return (
    <SortedArea>
      <SortedButton
        onClick={() => {
          handleSortByDate();
        }}
        $isActive={newer}
      >
        최신순
      </SortedButton>
      <SortedButton
        onClick={() => {
          handleSortByViewed();
        }}
        $isActive={mostViewed}
      >
        조회수
      </SortedButton>
    </SortedArea>
  );
};

const SortedArea = styled.div`
  margin: 1.25rem 0;
  @media screen and (min-width: 1024px) {
    margin: 1.875rem 0;
  }
`;

const SortedButton = styled.button<IStyledProps>`
  margin-right: 0.625rem;
  padding: 5px;
  background-color: ${(props) => (props.$isActive ? '#F0930D' : '#F4F2EF')};
  border-radius: 5px;
  color: ${(props) => (props.$isActive ? '#ffffff' : '#000000')};
  font-size: 0.75rem;
  &:hover,
  &:active {
    background-color: var(--color-orange);
    color: var(--color-white);
  }
  @media screen and (min-width: 1024px) {
    padding: 0.5rem;
    font-size: 13px;
  }
`;

export default SortButtons;
