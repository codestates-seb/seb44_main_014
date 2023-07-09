import { styled } from 'styled-components';
import { useState } from 'react';
// import SignUpPost from '../components/fetch/SignUpPost.tsx';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {}

const SignUp: React.FC<SignUpProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [copyPassword, setCopyPassword] = useState<string>('');
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [pwdErrMsg, setPwdErrMsg] = useState<string>('');
  const [copyPwdErrMsg, setCopyPwdErrMsg] = useState<string>('');

  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    return;
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    return;
  };
  const handleCopyPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopyPassword(e.target.value);
    return;
  };
  const signUpValidate = async () => {
    let signUpErr = false;
    if (!email.includes('@')) {
      setEmailErrMsg('이메일형식이 올바르지 않습니다.');
      signUpErr = true;
    } else {
      setEmailErrMsg('');
    }

    if (!/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,100}$/.test(password)) {
      setPwdErrMsg('비밀번호는 특수문자, 영문, 숫자 포함  8글자 이상 입니다.');
      signUpErr = true;
    } else {
      setPwdErrMsg('');
    }

    if (password !== copyPassword) {
      setCopyPwdErrMsg('비밀번호 확인이 비밀번호와 일치하지 않습니다.');
      signUpErr = true;
    } else {
      setCopyPwdErrMsg('');
    }

    if (!signUpErr) {
      try {
        //response.data쓸필요없잖아?
        // const responseData = await SignUpPost(email, password, copyPassword);
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      } catch (error) {
        //409에러인가??
        alert('이미 가입되어 있는 이메일입니다.');
      }
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
          <Input value={password} onChange={handlePasswordChange} />
          <ErrorMessage>{pwdErrMsg}</ErrorMessage>
        </InputSection>
        <InputSection>
          <Title>비밀번호확인</Title>
          <Input value={copyPassword} onChange={handleCopyPasswordChange} />
          <ErrorMessage>{copyPwdErrMsg}</ErrorMessage>
        </InputSection>
      </InputContainer>
      <SignUpButtonContainer onClick={signUpValidate}>회원가입</SignUpButtonContainer>
      <LoginTextContainer>
        <div>
          회원이신가요? <a href="/login">로그인</a>으로 가기
        </div>
      </LoginTextContainer>
      <OAuthButtonContainer>
        <OAuthButtonSection>Google</OAuthButtonSection>
        <OAuthButtonSection>Kakao</OAuthButtonSection>
        <OAuthButtonSection>Naver</OAuthButtonSection>
      </OAuthButtonContainer>
    </SignUpContainer>
  );
};
export default SignUp;

const SignUpContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 1.875rem; /* 50px 30px */
  font-size: 14px;
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

const OAuthButtonContainer = styled.article`
  display: flex;
  flex-direction: column;
  > button:nth-child(2) {
    margin: 10px 0;
  }
`;
const OAuthButtonSection = styled.button`
  height: 40px;
  background-color: var(--color-gray);
  border-color: black;
`;
