import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from 'styled-components';
import TagCheckbox from '../components/UI/TagCheckbox.tsx';
import Button from '../components/UI/Button.tsx';
import { checkedValue, selectOneCheckbox } from '../util/common.ts';
import { IUserState } from '../store/userSlice.ts';
import axios from 'axios';
import { getCookie } from '../util/cookie/index.ts';

const EditUserInfo = () => {
  const [userData, setUserData] = useState({
    image: '',
    name: '',
    email: '',
    gender: '',
    location: '',
    foodTag: {
      foodTagId: 1,
    },
  });
  const userId = useSelector((state: IUserState) => state.user.memberId);
  const [userImg, setUserImg] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userFoodTag, setUserFoodTag] = useState(1);

  useEffect(() => {
    axios
      .patch(
        `${import.meta.env.VITE_APP_API_URL}/users/mypage/${userId}/edit`,
        {
          image: userImg,
          foodTag: {
            foodTagId: userFoodTag,
          },
        },
        {
          headers: { Authorization: getCookie('accessToken') },
        }
      )
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        UserGender(res.data);
        setUserImg(res.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const foodTag = checkedValue(e);
    setUserFoodTag(parseInt(foodTag, 10));
    console.log(userFoodTag);
  };

  const Check = () => {
    axios.patch(
      `${import.meta.env.VITE_APP_API_URL}/users/mypage/${userId}/edit`,
      {
        image: userImg,
        foodTag: {
          foodTagId: userFoodTag,
        },
      },
      {
        headers: { Authorization: getCookie('accessToken') },
      }
    );
  };

  const UserGender = (data: any) => {
    if (data.gender === 'MALE') {
      setUserGender('남성');
    }
    if (data.gender === 'FEMALE') {
      setUserGender('여성');
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('multipartFile', selectedImage);

    const imageResponseUrl = await axios
      .post(`${import.meta.env.VITE_APP_API_URL}/users/images/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      })
      .then((res) => res.data[0]);
    setUserImg(imageResponseUrl);
  };
  return (
    <MainContainer>
      <UserImgContainer>
        <UserImg></UserImg>
      </UserImgContainer>
      <ImgEditor htmlFor="profileImg_uploads">
        프로필 사진 변경
        <input type="file" id="profileImg_uploads" accept="image/*" onChange={handleImageChange}></input>
      </ImgEditor>
      <UneditableContainer>
        <UneditableComponent>
          <EditorTitle>이메일</EditorTitle>
          <UndeitableTextBox>{userData.email}</UndeitableTextBox>
        </UneditableComponent>
        <UneditableComponent>
          <EditorTitle>활동명</EditorTitle>
          <UndeitableTextBox>{userData.name}</UndeitableTextBox>
        </UneditableComponent>
      </UneditableContainer>
      <UserGenderEditContainer>
        <EditorTitle className={'GenderTitle'}>성별</EditorTitle>
        <UserGenderEditPositioner>
          <div>{userGender}</div>
        </UserGenderEditPositioner>
      </UserGenderEditContainer>
      <UserLocationEditContainer>
        <EditorTitle className={'GenderTitle'}>지역</EditorTitle>
        <div>{userData.location}</div>
      </UserLocationEditContainer>
      <UserTagEditContainer>
        <EditorTitle className={'GenderTitle'}>음식 태그</EditorTitle>
        <UserTagBox>
          <TagCheckbox type="food" value={1} handleGetValue={handleFoodTag}>
            # 한식
          </TagCheckbox>
          <TagCheckbox type="food" value={2} handleGetValue={handleFoodTag}>
            # 중식
          </TagCheckbox>
          <TagCheckbox type="food" value={3} handleGetValue={handleFoodTag}>
            # 일식
          </TagCheckbox>
          <TagCheckbox type="food" value={4} handleGetValue={handleFoodTag}>
            # 양식
          </TagCheckbox>
          <TagCheckbox type="food" value={5} handleGetValue={handleFoodTag}>
            # 기타
          </TagCheckbox>
        </UserTagBox>
      </UserTagEditContainer>
      <ButtonContainer>
        <Button onClick={Check}>
          <Link to="/board">저장</Link>
        </Button>
      </ButtonContainer>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin: 3.125rem auto;
  width: 40.625rem;
  height: 46.875rem;
`;

const UserImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.625rem;
  height: 15.625rem;
  margin: 0 auto 1.875rem;
`;

const UserImg = styled.div`
  width: 15.625rem;
  height: 15.625rem;
  padding: 3.125rem;
  background: black;
  border-radius: 50%;
`;

const ImgEditor = styled.label`
  font-size: 1rem;
  text-align: center;
  cursor: pointer;

  input {
    display: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const EditorTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 0.625rem;

  &.GenderTitle {
    margin-bottom: 1.25rem;
  }
`;

const UneditableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
`;

const UneditableComponent = styled.div`
  width: 18.75rem;
  height: 3.75rem;
  margin: 0 0.625rem;
`;

const UndeitableTextBox = styled.p`
  width: 18.75rem;
  height: 2.1875rem;
  padding: 0.5rem 0.625rem;
  background-color: var(--color-gray);
  border: 0.0625rem solid var(--color-gray);
  border-radius: 0.3125rem;
`;

const UserGenderEditContainer = styled.div`
  width: 9.375rem;
  height: 3.75rem;
  margin-left: 0.9375rem;
`;

const UserGenderEditPositioner = styled.div`
  display: flex;
`;

const UserLocationEditContainer = styled.div`
  width: 18.75rem;
  height: 3.75rem;
  margin-top: 30px;
  margin-left: 0.9375rem;
`;

const UserTagEditContainer = styled.div`
  width: 500px;
  height: 3.75rem;
  margin-top: 30px;
  margin-left: 0.9375rem;
`;

const UserTagBox = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  margin-left: 0.9375rem;
  margin-top: 30px;
`;

export default EditUserInfo;
