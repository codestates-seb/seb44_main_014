import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from 'styled-components';
import TagCheckbox from '../components/UI/TagCheckbox.tsx';
import Button from '../components/UI/Button.tsx';
import { checkedValue, selectOneCheckbox } from '../util/common.ts';
import { IUserState, foodTagChange } from '../store/userSlice.ts';
import { ILocationState } from '../store/locationSlice.ts';
import api from '../util/api/api.tsx';
import Loading from '../components/Loading.tsx';
import { FOOD_TAGS } from '../constant/constant.ts';

const EditUserInfo = () => {
  const dispatch = useDispatch();
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
  const userEmail = useSelector((state: IUserState) => state.user.email);
  const address = useSelector((state: ILocationState) => state.location.address);
  const [userImg, setUserImg] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userFoodTag, setUserFoodTag] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      (await api())
        .get(`/users/mypage/${userId}`)
        .then((res) => {
          console.log(res);
          setUserData(res.data);
          UserGender(res.data);
          setUserImg(res.data.image);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const foodCheckboxes = document.getElementsByName('food');
    for (let i = 0; i < foodCheckboxes.length; i++) {
      if (userData.foodTag.foodTagId === Number((foodCheckboxes[i] as HTMLInputElement).value)) {
        (foodCheckboxes[i] as HTMLInputElement).checked = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const patchData = async () => {
    (await api())
      .patch(`/users/mypage/${userId}/edit`, {
        image: userImg,
        foodTag: {
          foodTagId: userFoodTag,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(
          foodTagChange({
            memberId: userId,
            isLogin: true,
            email: userEmail,
            foodTagId: Number(userFoodTag),
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const foodTag = checkedValue(e);
    setUserFoodTag(Number(foodTag));
  };
  console.log(userFoodTag);
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

    // const imageResponseUrl = (await api())
    //   .patch(`${import.meta.env.VITE_APP_API_URL}/users/images/upload`, formData, {
    //     withCredentials: true,
    //   })
    //   .then((res) => res.data[0]);
    // setUserImg(imageResponseUrl);
  };

  if (!userImg) {
    setUserImg('https://bobimage.s3.ap-northeast-2.amazonaws.com/member/defaultProfile.png');
  }
  return (
    <>
      {isLoading && <Loading />}
      {!isLoading && (
        <MainContainer>
          <UserImgContainer>
            <UserImg src={userImg} />
          </UserImgContainer>
          <ImgEditorContainer>
            <ImgEditor htmlFor="profileImg_uploads">
              프로필 사진 변경
              <input type="file" id="profileImg_uploads" accept="image/*" onChange={handleImageChange}></input>
            </ImgEditor>
          </ImgEditorContainer>
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
            <div>{address}</div>
          </UserLocationEditContainer>
          <UserTagEditContainer>
            <EditorTitle className={'GenderTitle'}>음식 태그</EditorTitle>
            <UserTagBox>
              {FOOD_TAGS.map((tag) => (
                <TagCheckbox key={tag.id} type="food" value={tag.id} handleGetValue={handleFoodTag}>
                  {tag.text}
                </TagCheckbox>
              ))}
            </UserTagBox>
          </UserTagEditContainer>
          <ButtonContainer>
            <Link to={`/users/mypage/${userId}`}>
              <Button onClick={patchData}>저장</Button>
            </Link>
          </ButtonContainer>
        </MainContainer>
      )}
    </>
  );
};

const MainContainer = styled.div`
  margin: 3.125rem auto;
  width: 40.625rem;
  height: 46.875rem;

  @media (max-width: 768px) {
    max-width: 360px;
    min-height: 500px;
  }
`;

const UserImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15.625rem;
  height: 15.625rem;
  margin: 0 auto 1.875rem;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const UserImg = styled.img`
  width: 15.625rem;
  height: 15.625rem;
  padding: 3.125rem;
  border-radius: 50%;
`;

const ImgEditorContainer = styled.div`
  display: flex;
  justify-content: center;
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

  @media (max-width: 768px) {
    display: block;
  }
`;

const UneditableComponent = styled.div`
  width: 18.75rem;
  height: 3.75rem;
  margin: 0 0.625rem;

  @media (max-width: 768px) {
    margin-top: 1.875rem;
  }
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

  @media (max-width: 768px) {
    width: 18.75rem;
  }
`;

const UserTagBox = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  margin-left: 0.9375rem;
  margin-top: 30px;
`;

export default EditUserInfo;
