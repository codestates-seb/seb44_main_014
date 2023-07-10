import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
// import axios from 'axios';

import InputRadio from '../components/buttons/InputRadio.tsx';
import TextEditor from '../components/TextEditor/TextEditor.tsx';
import TagCheckbox from '../components/buttons/TagCheckbox.tsx';

type Nullable<T> = T | null;

export interface IPostInfo {
  memberId: number;
  category: string;
  title: string;
  content: string;
  genderTag: {
    genderTagId: Nullable<number>;
  };
  foodTag: {
    foodTagId: Nullable<number>;
  };
  mate: {
    mateNum: Nullable<number>;
  };
}

const PostBoard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<IPostInfo>({
    memberId: 0, // 사용자 memberID
    category: '',
    title: '',
    content: '',
    genderTag: {
      genderTagId: 3,
    },
    foodTag: {
      foodTagId: null,
    },
    mate: {
      mateNum: 0,
    },
  });
  console.log(info);

  const postSubmitInfo = () => {
    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/boardpost`, info)
    //   .then((res) => {
    //     console.log(res);
    //     navigate(res.location);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

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
    const category = getCheckedValue(e);
    setInfo({ ...info, category: category, foodTag: { foodTagID: 0 } });
  };

  const handleGenderTag = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName('gender');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
    const genderTag = getCheckedValue(e);
    setInfo({ ...info, genderTag: { genderTagId: Number(genderTag) } });
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName('food');
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
    const foodTag = getCheckedValue(e);
    setInfo({ ...info, foodTag: { foodTagId: Number(foodTag) } });
  };

  const handleSubmitInfo = () => {
    if (!info.category) {
      alert('카테고리를 체크해주세요.');
    } else if (!info.title) {
      alert('제목을 작성해주세요.');
    } else if (!info.content) {
      alert('내용을 작성해주세요.');
    } else if (!info.mate.mateNum) {
      alert('원하는 인원 수를 작성해주세요.');
    } else {
      if (!info.genderTag.genderTagId) {
        setInfo({ ...info, genderTag: { genderTagId: 3 } });
      }
      if (!info.foodTag.foodTagId) {
        setInfo({ ...info, foodTag: { foodTagId: null } });
      }
      postSubmitInfo();
    }
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
            <InputRadio type="category" value="EATING" handleGetValue={handleCategoryType}>
              밥 먹기
            </InputRadio>
            <InputRadio type="category" value="SHOPPING" handleGetValue={handleCategoryType}>
              장 보기
            </InputRadio>
          </RadioFlex>
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>제목 *</InfoTitle>
          <InputText
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInfo({ ...info, title: (e.target as HTMLInputElement).value })
            }
          />
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>내용 *</InfoTitle>
          <TextEditor info={info} setInfo={setInfo} />
        </InfoDiv>
        <InfoDiv>
          <InfoTitle>성별 태그</InfoTitle>
          <TagFlex>
            {genderTags.map((tag) => (
              <TagCheckbox key={tag.id} type="gender" value={tag.id} handleGetValue={handleGenderTag}>
                {tag.text}
              </TagCheckbox>
            ))}
          </TagFlex>
        </InfoDiv>
        {info.category !== 'SHOPPING' && (
          <InfoDiv>
            <InfoTitle>음식 태그</InfoTitle>
            <TagFlex>
              {foodTags.map((tag) => (
                <TagCheckbox key={tag.id} type="food" value={tag.id} handleGetValue={handleFoodTag}>
                  {tag.text}
                </TagCheckbox>
              ))}
            </TagFlex>
          </InfoDiv>
        )}
        <InfoDiv>
          <InfoTitle>모집 인원 *</InfoTitle>
          <div>
            <InputNumber
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInfo({ ...info, mate: { mateNum: Number((e.target as HTMLInputElement).value) } })
              }
            />
          </div>
        </InfoDiv>
        <SubmitButton type="button" onClick={() => handleSubmitInfo()}>
          등록
        </SubmitButton>
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
  @media screen and (min-width: 1024px) {
    display: none;
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
  width: 100%;
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

  @media screen and (min-width: 1024px) {
    width: 160px;
    margin-left: auto;
  }
`;

export default PostBoard;
