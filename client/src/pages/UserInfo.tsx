import { styled } from 'styled-components';
import Button from '../components/UI/Button.tsx';
import InputRadio from '../components/UI/InputRadio.tsx';
import TagCheckbox from '../components/UI/TagCheckbox.tsx';
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import ZipCodeInput from '../components/zipCodeInput.tsx';
import { useNavigate } from 'react-router-dom';
import { FOOD_TAGS } from '../constant/constant.ts';
import { locationPost } from '../store/locationSlice.ts';
import { IUserState, foodTagChange } from '../store/userSlice.ts';
// login, signup, userinfo에서 모두 버튼을 누르면 다 validate해야하는데 하나의 컴포넌트로 묶을 수는 없을까?? 뭔가 form, input같은걸로 태그달면 할 수 있을 것 같은데
interface IUserInfo {
  name: string;
  image: string;
  gender: string;
  foodTag: { foodTagId: number } | null;
}

interface ILocation {
  latitude: number | null;
  longitude: number | null;
  address: string;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: '',
    image: '',
    gender: '',
    foodTag: null, //선택안할경우에는 초기값이 0? -> null
  });
  const [nameErrMsg, setNameErrMsg] = useState<string>('');
  const [genderErrMsg, setGenderErrMsg] = useState<string>('');
  const [location, setLocation] = useState<ILocation>({
    latitude: null,
    longitude: null,
    address: '',
  });
  const [locationErrMsg, setLocationErrMsg] = useState<string>('');
  /////////////////////////////////////////////////////////
  // const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string | undefined>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const memberId = useSelector((state: IUserState) => state.user.memberId);
  const email = useSelector((state: IUserState) => state.user.email);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (!selectedImage) return;
    setPreview(URL.createObjectURL(selectedImage));

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
    setUserInfo({ ...userInfo, image: imageResponseUrl });
    console.log(userInfo);
  };
  /////////////////////////////////////////////////////////
  const foodTags = FOOD_TAGS;

  const selectOneCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName((e.target as HTMLInputElement).name);
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };

  const handleNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserInfo({ ...userInfo, name: name });
  };

  const checkedValue = (e: React.MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
      return target.value;
    } else {
      return '';
    }
  };

  const handleGenderRadio = (e: React.MouseEvent<HTMLInputElement>) => {
    const gender = checkedValue(e);
    setUserInfo({ ...userInfo, gender: gender });
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const foodTag = checkedValue(e);
    setUserInfo({
      ...userInfo,
      foodTag: {
        foodTagId: Number(foodTag),
      },
    });
  };

  const userInfoValidate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.persist();

    let userInfoErr = false;
    if (!userInfo.name) {
      setNameErrMsg('활동명은 필수로 입력해야합니다.');
      userInfoErr = true;
    } else {
      setNameErrMsg('');
    }
    if (!userInfo.gender) {
      setGenderErrMsg('성별은 필수로 입력해야합니다.');
      userInfoErr = true;
    } else {
      setGenderErrMsg('');
    }
    if (!location) {
      setLocationErrMsg('지역은 필수로 입력해야합니다.');
      userInfoErr = true;
    } else {
      setLocationErrMsg('');
    }
    if (!userInfoErr) {
      try {
        const submitData = userInfo;
        console.log(submitData);

        await axios.patch(`${import.meta.env.VITE_APP_API_URL}/users/userInfo/${memberId}`, submitData, {
          withCredentials: true,
        });

        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/users/mypage/${memberId}/location`,
          location
        );
        dispatch(locationPost({ locationId: response.headers.location, address: location.address }));

        if (userInfo.foodTag !== null) {
          dispatch(
            foodTagChange({
              foodTagId: userInfo.foodTag.foodTagId,
            })
          );
        }

        alert('제출이 완료되었습니다.');
        // login 상태 들고 가야해
        navigate('/');
      } catch (error) {
        alert('이미 사용하고 있는 활동명입니다.');
      }
    }
  };

  return (
    <UserInfoContainer>
      <ProfileImgContainer>
        <ProfileImg src={preview} />
        <ProfileImgChangeText htmlFor="profileImg_uploads">
          프로필 사진 변경
          <input type="file" id="profileImg_uploads" accept="image/*" onChange={handleImageChange} />
        </ProfileImgChangeText>
      </ProfileImgContainer>
      <InfoContainer>
        <EmailContainer>
          <EmailTitle>이메일</EmailTitle>
          <EmailInput readOnly defaultValue={email || ''} />
        </EmailContainer>
        <NameContainer>
          <NameTitle>활동명 *</NameTitle>
          <NameInput required value={userInfo.name} onChange={handleNameValue}></NameInput>
          <ErrorMessage>{nameErrMsg}</ErrorMessage>
        </NameContainer>
        <GenderContainer>
          <GenderTitle>성별 *</GenderTitle>
          <GenderRadio>
            <InputRadio type="gender" value="MALE" handleGetValue={handleGenderRadio}>
              남성
            </InputRadio>
            <InputRadio type="gender" value="FEMALE" handleGetValue={handleGenderRadio}>
              여성
            </InputRadio>
          </GenderRadio>
          <ErrorMessage>{genderErrMsg}</ErrorMessage>
        </GenderContainer>
        <ZipCodeInput locationErrMsg={locationErrMsg} location={location} setLocation={setLocation} />
        <FoodTagContainer>
          <FoodTagTitle>음식 태그</FoodTagTitle>
          <FoodTagList>
            {foodTags.map((tag) => (
              <TagCheckbox key={tag.id} type="food" value={tag.id} handleGetValue={handleFoodTag}>
                {tag.text}
              </TagCheckbox>
            ))}
          </FoodTagList>
        </FoodTagContainer>
      </InfoContainer>
      <Button onClick={userInfoValidate}>저장</Button>
    </UserInfoContainer>
  );
};

export default UserInfo;

const UserInfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3.125rem 1.875rem;
  font-size: 14px;
`;
const ProfileImgContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: var(--color-gray);
`;
const ProfileImgChangeText = styled.label`
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin: 5px 0 10px 0;
  }
  @media screen and (min-width: 769px) {
    margin: 5px 0 15px 0;
  }
  input {
    display: none;
  }
`;
const InfoContainer = styled.article`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  @media screen and (max-width: 560px) {
    //여기서 이렇게 하드코딩말고는 방법이 없나?
    width: 100%;
  }
  @media screen and (min-width: 560px) {
    width: 500px;
  }
`;
const EmailContainer = styled.section`
  width: 100%;
  margin: 0 0 20px 0;
`;
const EmailTitle = styled.div`
  margin: 0 0 10px 0;
`;
const EmailInput = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-gray);
`;
const NameContainer = styled(EmailContainer)``;
const NameTitle = styled(EmailTitle)``;
const NameInput = styled(EmailInput)``;
const ErrorMessage = styled.div`
  margin: 10px 0 10px 0;
  color: var(--status-finished);
`;
const GenderContainer = styled(EmailContainer)``;
const GenderTitle = styled(EmailTitle)``;
const GenderRadio = styled.section`
  display: flex;
  flex-direction: row;
  label {
    margin: 0 25px 0 0;
  }
`;
const FoodTagContainer = styled(EmailContainer)``;
const FoodTagTitle = styled(EmailTitle)``;
const FoodTagList = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
    margin: 0 17px 0 0;
  }
  :last-child {
    margin: 0;
  }
`;
