import { useState } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { GENDER_TAGS, FOOD_TAGS } from '../../constant/constant.ts';
import { IFilterInfo } from '../../interface/board.ts';

interface IFilterData {
  filterInfo: IFilterInfo;
  setFilterInfo: React.Dispatch<React.SetStateAction<IFilterInfo>>;
  setCurrentApi: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilter = ({ filterInfo, setFilterInfo, setCurrentApi }: IFilterData) => {
  const [keyword, setKeyword] = useState('');
  const getSearchData = () => {
    setFilterInfo({ ...filterInfo, page: 1, foodTag: null, genderTag: null });
    setCurrentApi(`&keyword=${keyword}&category=${filterInfo.category}`);
    setKeyword('');
  };

  return (
    <SeachSection>
      <InputArea>
        <Label htmlFor="search">검색</Label>
        <InputSearch
          type="text"
          id="search"
          value={keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            // setFilterInfo({ ...filterInfo, page: 1, search: (e.target as HTMLInputElement).value })
            setKeyword((e.target as HTMLInputElement).value)
          }
        />
        <ButtonSearch type="button" onClick={() => getSearchData()}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </ButtonSearch>
        <TagsArea>
          <TagsRow>
            {GENDER_TAGS.map((tag) => (
              <button
                key={tag.id}
                value={tag.id}
                className={filterInfo.genderTag === tag.id ? 'active' : ''}
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  setFilterInfo({ ...filterInfo, page: 1, genderTag: tag.id, foodTag: null });
                  setCurrentApi(`&genderTag=${(e.target as HTMLButtonElement).value}&category=${filterInfo.category}`);
                }}
              >
                {tag.text}
              </button>
            ))}
          </TagsRow>
          {filterInfo.category !== 'SHOPPING' && (
            <TagsRow>
              {FOOD_TAGS.map((tag) => (
                <button
                  key={tag.id}
                  value={tag.id}
                  className={filterInfo.foodTag === tag.id ? 'active' : ''}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    setFilterInfo({ ...filterInfo, page: 1, foodTag: tag.id, genderTag: null });
                    setCurrentApi(`&foodTag=${(e.target as HTMLButtonElement).value}`);
                  }}
                >
                  {tag.text}
                </button>
              ))}
            </TagsRow>
          )}
        </TagsArea>
      </InputArea>
    </SeachSection>
  );
};

const SeachSection = styled.section`
  width: 100%;
  height: 200px;
  padding: 0 1.875rem;
  background-image: url('/img/background_grocery.jpg');
  background-color: rgba(0, 0, 0, 0.3);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-blend-mode: multiply;
  @media screen and (min-width: 768px) {
    height: 300px;
  }
`;

const InputArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding-top: 3.125rem;
  @media screen and (min-width: 768px) {
    padding-top: 100px;
  }
`;

const Label = styled.label`
  display: none;
`;

const InputSearch = styled.input`
  width: 100%;
  padding-left: 10px;
  padding-right: 36px;
  height: 2.25rem;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  font-size: 0.875rem;
  box-sizing: border-box;
`;

const ButtonSearch = styled.button`
  position: absolute;
  right: 0;
  top: 3.125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-black);
  @media screen and (min-width: 768px) {
    top: 100px;
  }
`;

const TagsArea = styled.ul`
  /* margin: 0 auto; */
`;

const TagsRow = styled.li`
  width: fit-content;
  margin: 0.625rem auto 0;
  button {
    margin-right: 0.625rem;
    padding: 5px;
    background-color: #ffffff;
    border-radius: 5px;
    font-size: 0.875rem;
    font-weight: 700;
    color: #000000;
    cursor: pointer;
    &.active {
      background-color: var(--color-orange);
      color: #ffffff;
    }
  }
`;

export default SearchFilter;
