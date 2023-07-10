import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import InputRadio from '../components/buttons/InputRadio.tsx';
import TextEditor from '../components/TextEditor/TextEditor.tsx';
import TagCheckbox from '../components/buttons/TagCheckbox.tsx';

const PostBoard = () => {
  const navigate = useNavigate();

  const genderTags = [
    { id: 1, text: '# 여자만' },
    { id: 2, text: '# 남자만' },
    { id: 3, text: '# 남녀노소' },
  ];

  const foodTags = [
    { id: 1, text: '# 한식' },
    { id: 2, text: '# 중식' },
    { id: 3, text: '# 양식' },
    { id: 4, text: '# 일식' },
    { id: 5, text: '# 기타' },
  ];

  const getCheckedValue = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      return target.value;
    } else {
      return '';
    }
    // console.log(result);
  };

  const handleCategoryType = (e: React.MouseEvent<HTMLInputElement>) => {
    const test = getCheckedValue(e);
    console.log(test);
  };

  const handleGenderTag = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName('gender');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        checkboxes[i].checked = false;
      }
    }
    const test = getCheckedValue(e);
    console.log(test);
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName('food');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        checkboxes[i].checked = false;
      }
    }
    const test = getCheckedValue(e);
    console.log(test);
  };

  return (
    <PostBoardContainer>
      <PostBoardTop>
        <PostBoardH2>게시글 작성</PostBoardH2>
        <CloseButton onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
      </PostBoardTop>
      <form>
        <InfoDiv>
          <InfoTitle>카테고리 *</InfoTitle>
          <RadioFlex>
            <InputRadio
              type="category"
              handleGetValue={(e: React.MouseEvent<HTMLInputElement>) => handleCategoryType(e)}
            >
              밥 먹기
            </InputRadio>
            <InputRadio
              type="category"
              handleGetValue={(e: React.MouseEvent<HTMLInputElement>) => handleCategoryType(e)}
            >
              장 보기
            </InputRadio>
          </RadioFlex>
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>제목 *</InfoTitle>
          <InputText type="text" />
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>내용 *</InfoTitle>
          <TextEditor />
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>성별 태그</InfoTitle>
          <TagFlex>
            {genderTags.map((tag) => (
              <TagCheckbox
                key={tag.id}
                type="gender"
                value={tag.id}
                handleGetValue={(e: React.MouseEvent<HTMLInputElement>) => handleGenderTag(e)}
              >
                {tag.text}
              </TagCheckbox>
            ))}
          </TagFlex>
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>음식 태그</InfoTitle>
          <TagFlex>
            {foodTags.map((tag) => (
              <TagCheckbox
                key={tag.id}
                type="food"
                value={tag.id}
                handleGetValue={(e: React.MouseEvent<HTMLInputElement>) => handleFoodTag(e)}
              >
                {tag.text}
              </TagCheckbox>
            ))}
          </TagFlex>
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>모집 인원 *</InfoTitle>
          <div>
            <InputNumber type="number" />
          </div>
        </InfoDiv>
        <SubmitButton>등록</SubmitButton>
      </form>
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
`;

const InfoDiv = styled.div`
  margin-top: 1.875rem;
`;

const InfoTitle = styled.span`
  display: block;
  margin-bottom: 1rem;
  font-size: 13px;
`;

const RadioFlex = styled.div`
  display: flex;
  gap: 1.875rem;
`;

const TagFlex = styled.div`
  display: flex;
  gap: 0.625rem;
`;

const InputText = styled.input`
  width: 100%;
  height: 2.25rem;
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  box-sizing: border-box;
`;

const InputNumber = styled.input`
  width: 4rem;
  height: 2.25rem;
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.6875rem;
  height: 2.5rem;
  margin-top: 2.5rem;
  background-color: var(--color-orange);
  border-radius: 0.3125rem;
  color: #fff;
  font-size: 1rem;

  &:hover,
  &:active {
    background-color: #d8820a;
  }
`;

export default PostBoard;
