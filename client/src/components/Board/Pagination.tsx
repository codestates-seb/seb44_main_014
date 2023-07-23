// import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { styled } from 'styled-components';
// import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { IFilterInfo, IPageInfo } from '../../interface/board.ts';

interface ISelected {
  selected: number;
}
interface IPaginationProps {
  filterInfo: IFilterInfo;
  setFilterInfo: React.Dispatch<React.SetStateAction<IFilterInfo>>;
  pageInfo: IPageInfo;
}

const Pagination = ({ filterInfo, setFilterInfo, pageInfo }: IPaginationProps) => {
  const handlePageChange = (e: ISelected) => {
    setFilterInfo({
      ...filterInfo,
      page: e.selected + 1,
    });
  };

  return (
    <PaginationContainer>
      <ReactPaginate
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        pageCount={pageInfo.totalPages}
        pageRangeDisplayed={10}
        marginPagesDisplayed={10}
        onPageChange={handlePageChange}
        containerClassName={'container'}
        previousLinkClassName={'page'}
        breakClassName={'page'}
        nextLinkClassName={'page'}
        pageClassName={'page'}
        disabledClassName={'disabled'}
        activeClassName={'active'}
        forcePage={filterInfo.page - 1}
      />
    </PaginationContainer>
  );
};

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 6px;
    margin-right: 10px;
    line-height: 1;
    cursor: pointer;
  }
  .container {
    display: flex;
    list-style: none;
  }

  .page a {
    border: 1px solid var(--color-orange);
    cursor: pointer;
  }

  .disabled a {
    border: 1px solid var(--color-gray) !important;
    color: var(--color-gray) !important;
    cursor: not-allowed !important;
  }

  .active a {
    background-color: var(--color-orange);
    color: #ffffff;
    font-weight: bold;
  }

  .previous a {
    border: 1px solid var(--color-orange);
  }

  .break {
    padding: 10px;
  }

  .next a {
    border: 1px solid var(--color-orange);
  }
`;

export default Pagination;
