import { styled } from 'styled-components';
import InputRadio from '../components/UI/InputRadio';
import Input from '../components/UI/Input';
import TagCheckbox from '../components/UI/TagCheckbox';
import Button from '../components/UI/Button';

const EditUserInfo = () => {
  return (
    <MainContainer>
      <UserImgContainer>
        <UserImg></UserImg>
      </UserImgContainer>
      <ImgEditor>프로필 사진 변경</ImgEditor>
      <UneditableContainer>
        <UneditableComponent>
          <EditorTitle>이메일</EditorTitle>
          <UndeitableTextBox>bobfriends@gmail.com</UndeitableTextBox>
        </UneditableComponent>
        <UneditableComponent>
          <EditorTitle>활동명</EditorTitle>
          <UndeitableTextBox>홍길동</UndeitableTextBox>
        </UneditableComponent>
      </UneditableContainer>
      <UserGenderEditContainer>
        <EditorTitle className={'GenderTitle'}>성별</EditorTitle>
        <UserGenderEditPositioner>
          <StyledRadio type={'gender'} id={'남성'}>
            남성
          </StyledRadio>
          <StyledRadio type={'gender'} id={'여성'}>
            여성
          </StyledRadio>
        </UserGenderEditPositioner>
      </UserGenderEditContainer>
      <UserLocationEditContainer>
        <EditorTitle className={'GenderTitle'}>지역 선택</EditorTitle>
        <StyledInput placeholder={'지역을 입력하세요'}></StyledInput>
      </UserLocationEditContainer>
      <UserTagEditContainer>
        <EditorTitle className={'GenderTitle'}>음식 태그</EditorTitle>
        <UserTagBox>
          <UserTag type={'food'}># 한식</UserTag>
          <UserTag type={'food'}># 중식</UserTag>
          <UserTag type={'food'}># 일식</UserTag>
          <UserTag type={'food'}># 양식</UserTag>
          <UserTag type={'food'}># 기타</UserTag>
        </UserTagBox>
      </UserTagEditContainer>
      <ButtonContainer>
        <StyledBtn className={'EditUser'}>저장</StyledBtn>
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

const ImgEditor = styled.h1`
  font-size: 1rem;
  text-align: center;
  cursor: pointer;

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

const StyledInput = styled(Input)`
  width: 300px;
`;

const StyledRadio = styled(InputRadio)``;

const UserLocationEditContainer = styled.div`
  width: 9.375rem;
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

const UserTag = styled(TagCheckbox)`
  padding: 10px;
  margin: 10px;
`;

const ButtonContainer = styled.div`
  margin-left: 0.9375rem;
  margin-top: 30px;
`;

const StyledBtn = styled(Button)`
  width: 43.75rem;

  &.EditUser {
    width: 43.75rem;
  }
`;

export default EditUserInfo;
