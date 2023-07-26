import { styled } from 'styled-components';
import { useState } from 'react';
import postSignUp from '../util/api/postSignUp.tsx';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [samePassword, setSamePassword] = useState<string>('');
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [pwdErrMsg, setPwdErrMsg] = useState<string>('');
  const [samePwdErrMsg, setSamePwdErrMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.includes('@')) {
      setEmailErrMsg('이메일형식이 올바르지 않습니다. (ex. bobfriend@bobfriend.com)');
    } else {
      setEmailErrMsg('');
    }
    setEmail(e.target.value);
    return;
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,100}$/.test(e.target.value)) {
      setPwdErrMsg('비밀번호는 특수문자, 영문, 숫자 포함  8글자 이상 입니다.');
    } else {
      setPwdErrMsg('');
    }
    setPassword(e.target.value);
    return;
  };
  const handleSamePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (password !== e.target.value) {
      setSamePwdErrMsg('비밀번호 확인이 비밀번호와 일치하지 않습니다.');
    } else {
      setSamePwdErrMsg('');
    }
    setSamePassword(e.target.value);
    return;
  };

  const signUpValidate = async () => {
    let signUpErr = true;
    if (!emailErrMsg && !pwdErrMsg && !samePwdErrMsg) {
      signUpErr = false;
    }

    if (!signUpErr) {
      try {
        //response.data쓸필요없잖아?
        await postSignUp(email, password, samePassword);
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } catch (error: any) {
        if (error.response.status === 409) {
          alert('이미 가입된 계정입니다.');
        } else {
          alert(error.response.message);
        }
      }
    } else {
      alert('조건에 맞는 회원정보를 입력해주세요.');
    }
  };

  return (
    <SignUpContainer>
      <InputContainer>
        <InputSection>
          <Title>이메일</Title>
          <Input value={email} onChange={handleEmailChange} />
          <ErrorMessage>{emailErrMsg}</ErrorMessage>
        </InputSection>
        <InputSection>
          <Title>비밀번호</Title>
          <Input type="password" value={password} onChange={handlePasswordChange} />
          <ErrorMessage>{pwdErrMsg}</ErrorMessage>
        </InputSection>
        <InputSection>
          <Title>비밀번호확인</Title>
          <Input type="password" value={samePassword} onChange={handleSamePasswordChange} />
          <ErrorMessage>{samePwdErrMsg}</ErrorMessage>
        </InputSection>
      </InputContainer>
      <SignUpButtonContainer onClick={signUpValidate}>회원가입</SignUpButtonContainer>
      <LoginTextContainer>
        <div>
          회원이신가요? <a href="/login">로그인</a>으로 가기
        </div>
      </LoginTextContainer>
      {/* <OAuthButtonContainer>
        <OAuthButtonSection>Google</OAuthButtonSection>
        <OAuthButtonSection>Kakao</OAuthButtonSection>
        <OAuthButtonSection>Naver</OAuthButtonSection>
      </OAuthButtonContainer> */}
    </SignUpContainer>
  );
};
export default SignUp;

const SignUpContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 1.875rem; /* 50px 30px */
  font-size: 14px;
  @media screen and (min-width: 768px) {
    max-width: 500px;
    margin: 50px auto;
  }
`;
const InputContainer = styled.article`
  display: flex;
  flex-direction: column;
`;
const InputSection = styled.section`
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin: 0 0 5px 0;
`;
const Input = styled.input`
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-gray);
`;
const ErrorMessage = styled.div`
  margin: 6px 0 10px 0;
  color: var(--status-finished);
`;
const SignUpButtonContainer = styled.button`
  height: 40px;
  margin: 10px 0 0 0;
  background-color: var(--color-orange);
  border-radius: 5px;
  color: white;
  font-weight: 800;
`;
const LoginTextContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.875rem 0;
  font-size: 14px;
  > div > a {
    text-decoration: underline;
  }
`;

// const OAuthButtonContainer = styled.article`
//   display: flex;
//   flex-direction: column;
//   > button:nth-child(2) {
//     margin: 10px 0;
//   }
// `;
// const OAuthButtonSection = styled.button`
//   height: 40px;
//   background-color: var(--color-gray);
//   border-color: black;
// `;
