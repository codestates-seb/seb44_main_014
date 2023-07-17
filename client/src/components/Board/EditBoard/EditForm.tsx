import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';

import InputRadio from '../../UI/InputRadio.tsx';
import TextEditor from '../../TextEditor/TextEditor.tsx';
import TagCheckbox from '../../UI/TagCheckbox.tsx';

import { GENDER_TAGS, FOOD_TAGS } from '../../../constant/constant.ts';
import { IEditInfo } from '../../../interface/board.tsx';

const EditForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const postId = Number(params.postId);
  const [info, setInfo] = useState<IEditInfo>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(info);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/board/posts/${postId}`)
      .then((res) => {
        const { category, content, mate, postTag, status, title, member } = res.data;
        const data = {
          category,
          content,
          mate,
          status,
          title,
          genderTag: { genderTagId: postTag.genderTagId },
          foodTag: { foodTagId: postTag.foodTagId },
          memberId: member.memberId,
        };
        console.log(res);
        setInfo(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const categoryRadios = document.getElementsByName('category');
    for (let i = 0; i < categoryRadios.length; i++) {
      if (info.category === (categoryRadios[i] as HTMLInputElement).value) {
        (categoryRadios[i] as HTMLInputElement).checked = true;
      }
    }
    const genderCheckboxes = document.getElementsByName('gender');
    for (let i = 0; i < genderCheckboxes.length; i++) {
      if (info.genderTag?.genderTagId === Number((genderCheckboxes[i] as HTMLInputElement).value)) {
        (genderCheckboxes[i] as HTMLInputElement).checked = true;
      }
    }
    const foodCheckboxes = document.getElementsByName('food');
    for (let i = 0; i < foodCheckboxes.length; i++) {
      if (info.foodTag?.foodTagId === Number((foodCheckboxes[i] as HTMLInputElement).value)) {
        (foodCheckboxes[i] as HTMLInputElement).checked = true;
      }
    }
    const statusRadios = document.getElementsByName('status');
    for (let i = 0; i < statusRadios.length; i++) {
      if (info.status === (statusRadios[i] as HTMLInputElement).value) {
        (statusRadios[i] as HTMLInputElement).checked = true;
      }
    }
  }, [info]);

  const patchSubmitInfo = () => {
    axios
      .patch(`${import.meta.env.VITE_APP_API_URL}/board/posts/${postId}/edit`, info)
      .then((res) => {
        console.log(res);
        navigate(`/board/posts/${postId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const checkedValue = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      return target.value;
    } else {
      return '';
    }
  };

  const selectOneCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName((e.target as HTMLInputElement).name);
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
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

  const handleStatusType = (e: React.MouseEvent<HTMLInputElement>) => {
    const status = checkedValue(e);
    setInfo({ ...info, status: status });
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
      patchSubmitInfo();
    }
  };

  if (isLoading) {
    return <div>LOADING..</div>;
  }

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
          value={info.title}
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
            value={Number(info.mate.mateNum)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInfo({ ...info, mate: { mateNum: Number((e.target as HTMLInputElement).value) } })
            }
          />
        </div>
      </InfoDiv>
      <InfoDiv>
        <InfoTitle>카테고리 *</InfoTitle>
        <RadioFlex>
          <InputRadio type="status" value="RECRUITING" handleGetValue={handleStatusType}>
            모집 중
          </InputRadio>
          <InputRadio type="status" value="COMPLETE" handleGetValue={handleStatusType}>
            모집 완료
          </InputRadio>
          <InputRadio type="status" value="END" handleGetValue={handleStatusType}>
            모집 종료
          </InputRadio>
        </RadioFlex>
      </InfoDiv>

      <SubmitButton type="button" onClick={() => handleSubmitInfo()}>
        수정
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

export default EditForm;
