import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import InputRadio from '../../UI/InputRadio.tsx';
import TextEditor from '../../TextEditor/TextEditor.tsx';
import TagCheckbox from '../../UI/TagCheckbox.tsx';

import authApi from '../../../util/api/authApi.tsx';
import { GENDER_TAGS, FOOD_TAGS } from '../../../constant/constant.ts';
import { IPostInfo } from '../../../interface/board.ts';
import { IUserState } from '../../../store/userSlice.ts';
import { checkedValue, selectOneCheckbox } from '../../../util/common.ts';

const PostForm = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: IUserState) => state.user.memberId);
  const [info, setInfo] = useState<IPostInfo>({
    memberId: userId, // 사용자
    category: '',
    title: '',
    content: '',
    genderTag: null,
    foodTag: null,
    mate: {
      mateNum: 0,
    },
  });

  const postSubmitInfo = async () => {
    (await authApi)
      .post(`/board/posts`, info)
      .then((res) => {
        const URI = res.headers.location;
        navigate(URI);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryType = (e: React.MouseEvent<HTMLInputElement>) => {
    const category = checkedValue(e);
    setInfo({ ...info, category: category, foodTag: null });
  };

  const handleGenderTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const genderTag = checkedValue(e);
    setInfo({ ...info, genderTag: { genderTagId: Number(genderTag) } });
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const foodTag = checkedValue(e);
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
      if (!info.genderTag || info.genderTag.genderTagId === 0) {
        setInfo({ ...info, genderTag: null });
      }
      if (!info.foodTag || info.foodTag.foodTagId === 0) {
        setInfo({ ...info, foodTag: null });
      }
      postSubmitInfo();
    }
  };

  return (
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
          {GENDER_TAGS.map((tag) => (
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
            {FOOD_TAGS.map((tag) => (
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
  );
};

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

export default PostForm;
