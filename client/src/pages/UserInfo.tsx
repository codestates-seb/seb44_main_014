import { styled } from 'styled-components';
import Button from '../components/UI/Button.tsx';
import InputRadio from '../components/UI/InputRadio.tsx';
import TagCheckbox from '../components/UI/TagCheckbox.tsx';
import { useState } from 'react';

// login, signup, userinfo에서 모두 버튼을 누르면 다 validate해야하는데 하나의 컴포넌트로 묶을 수는 없을까?? 뭔가 form, input같은걸로 태그달면 할 수 있을 것 같은데

const UserInfo = () => {
  // const [userInfo, setUserInfo] = useState({
  //   image: null,
  //   name: '',
  //   gender: '',
  //   location: '',
  //   foodTag: [
  //     //선택안할경우에는 초기값이 0? -> null
  //
  //   ],
  // });
  const [imageSrc, setImageSrc]: any = useState(null);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

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

  const handleFoodTag = (e: React.MouseEvent<HTMLInputElement>) => {
    // const foodTag = getCheckedValue(e);
    // setUserInfo({ ...userInfo, foodTag: { foodTagID: Number(foodTag) } });
  };

  return (
    <UserInfoContainer>
      <ProfileImgContainer>
        <ProfileImg width={'100%'} src={imageSrc}></ProfileImg>
        <ProfileImgChangeText type="file" accept="image/*" onChange={(e) => onUpload(e)}>
          프로필 사진 변경
        </ProfileImgChangeText>
      </ProfileImgContainer>
      <InfoContainer>
        <EmailContainer>
          <EmailTitle>이메일</EmailTitle>
          <EmailInput></EmailInput>
        </EmailContainer>
        <NameContainer>
          <NameTitle>활동명 *</NameTitle>
          <NameInput></NameInput>
        </NameContainer>
        <GenderContainer>
          <GenderTitle>성별 *</GenderTitle>
          <GenderRadio>
            <InputRadio type="gender">남성</InputRadio>
            <InputRadio type="gender">여성</InputRadio>
          </GenderRadio>
        </GenderContainer>
        <LocationContainer>
          <LocationTitle>지역 선택 *</LocationTitle>
          <LocationInputContainer>
            <LocationInput></LocationInput>
            <LocationButton>우편번호</LocationButton>
          </LocationInputContainer>
        </LocationContainer>
        <FoodTagContainer>
          <FoodTagTitle>음식 태그</FoodTagTitle>
          <FoodTagList>
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
          </FoodTagList>
        </FoodTagContainer>
      </InfoContainer>
      <Button>저장</Button>
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
const ProfileImgChangeText = styled.input`
  @media screen and (max-width: 768px) {
    margin: 5px 0 10px 0;
  }
  @media screen and (min-width: 769px) {
    margin: 5px 0 15px 0;
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
