import { styled } from 'styled-components';
import Button from '../components/UI/Button.tsx';
import InputRadio from '../components/UI/InputRadio.tsx';
import TagCheckbox from '../components/UI/TagCheckbox.tsx';
import React, { useState } from 'react';
// import axios from 'axios';

// login, signup, userinfo에서 모두 버튼을 누르면 다 validate해야하는데 하나의 컴포넌트로 묶을 수는 없을까?? 뭔가 form, input같은걸로 태그달면 할 수 있을 것 같은데
interface IUserInfo {
  name: string;
  image: string;
  gender: string;
  location: string;
  foodTag: number | null;
}

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    name: '',
    image: '',
    gender: '',
    location: '',
    foodTag: null, //선택안할경우에는 초기값이 0? -> null
  });
  const [nameErrMsg, setNameErrMsg] = useState('');
  const [genderErrMsg, setGenderErrMsg] = useState('');
  const [locationErrMsg, setLocationErrMsg] = useState('');
  /////////////////////////////////////////////////////////
  // const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0]; //formData써야하나?
    // console.log(selectedImage);
    // setImage(selectedImage);
    setUserInfo({ ...userInfo, image: selectedImage });
    setPreview(URL.createObjectURL(selectedImage));
    // console.log(URL.createObjectURL(selectedImage));
  };
  /////////////////////////////////////////////////////////
  const foodTags = [
    { id: 1, text: '# 한식' },
    { id: 2, text: '# 중식' },
    { id: 3, text: '# 양식' },
    { id: 4, text: '# 일식' },
    { id: 5, text: '# 기타' },
  ];

  const selectOneCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
    const checkboxes = document.getElementsByName((e.target as HTMLInputElement).name);
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] !== e.target) {
        (checkboxes[i] as HTMLInputElement).checked = false;
      }
    }
  };

  const handleNameValue = (e) => {
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

  const handleLocationValue = (e) => {
    const location = e.target.value;
    setUserInfo({ ...userInfo, location: location });
  };

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    selectOneCheckbox(e);
    const foodTag = checkedValue(e);
    setUserInfo({ ...userInfo, foodTag: Number(foodTag) });
  };

  const makeUserInfoData = async () => {
    const formData = new FormData();
    const { image, ...data } = userInfo;
    // console.log(image);
    // console.log(data);

    formData.append('image', image);
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    formData.append('data', blob);

    // await axios({
    //   method: 'POST',
    //   url: `/users/userInfo/{member-id}`,
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'multipart/form-data', // Content-Type을 반드시 이렇게 하여야 한다.
    //   },
    //   data: formData, // data 전송시에 반드시 생성되어 있는 formData 객체만 전송 하여야 한다.
    // });
  };

  const userInfoValidate = () => {
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
    if (!userInfo.location) {
      setLocationErrMsg('지역은 필수로 입력해야합니다.');
      userInfoErr = true;
    } else {
      setLocationErrMsg('');
    }
    if (!userInfoErr) {
      try {
        makeUserInfoData();
        //  patch해서 활동명 중복되나 확인 &
        // const responseData = await postUserInfo(userInfo.name, userInfo.gender, userInfo.location, userInfo.foodTag);
        alert('제출이 완료되었습니다.');
        // login 상태 들고 가야해
        // navigate('/');
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
          <EmailInput readOnly value="//ReadOnly:prop로 받아올것" />
        </EmailContainer>
        <NameContainer>
          <NameTitle>활동명 *</NameTitle>
          <NameInput value={userInfo.name} onChange={handleNameValue}></NameInput>
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
        <LocationContainer>
          <LocationTitle>지역 선택 *</LocationTitle>
          <LocationInputContainer>
            <LocationInput value={userInfo.location} onChange={handleLocationValue}></LocationInput>
            <LocationButton>우편번호</LocationButton>
          </LocationInputContainer>
          <ErrorMessage>{locationErrMsg}</ErrorMessage>
        </LocationContainer>
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
const InfoContainer = styled.section`
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
const LocationContainer = styled(EmailContainer)``;
const LocationTitle = styled(EmailTitle)``;
const LocationInputContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LocationInput = styled(EmailInput)`
  margin: 0 10px 0 0;
`;
const LocationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-orange);
  background: var(--color-orange);
  color: #fff;
  font-size: 14px;
  &:hover {
    background-color: #d8820a;
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
