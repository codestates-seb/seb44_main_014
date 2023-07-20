import { styled } from 'styled-components';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postLogin from '../util/api/postLogin.tsx';
import { setCookie } from '../util/cookie/index.ts';
import { login } from '../store/userSlice.ts';
import moment from 'moment';

// interface UserInfo {
//   gender: string;
//   memberId: string;
// }

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailErrMsg, setEmailErrMsg] = useState<string>('');
  const [pwdErrMsg, setPwdErrMsg] = useState<string>('');
  // const [userInfo, setUserInfo] = useState<UserInfo>({ gender: '', memberId: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 이렇게 useEffect쓰는게 나은지 아니면 async await썼으니까 충분한지??
  // useEffect(() => {
  //   // if (UserInfo.gender) {
  //   navigate('/');
  // } else {
  //   navigate(`/users/userInfo/${responseData.memberId}`);
  // }
  // }, [UserInfo]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    return;
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    return;
  };

  const loginValidate = async () => {
    let loginFormValid = true;
    if (!email.includes('@')) {
      setEmailErrMsg('이메일형식이 올바르지 않습니다.');
      loginFormValid = false;
    } else {
      setEmailErrMsg('');
    }

    //작동확인완료
    if (loginFormValid) {
      try {
        const response = await postLogin(email, password);
        // const { accessToken } = responseData;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        setCookie('accessToken', response.headers['Authorization']);
        setCookie('refreshToken', response.headers['Refresh']);

        localStorage.setItem('expiredAt', moment().add(1, 'hour').format('yyyy-MM-DD HH:mm:ss'));

        const responseData = response.data;
        alert('로그인에 성공했습니다.');
        // setUserInfo(responseData);

        dispatch(
          login({
            memberId: responseData.memberId,
            isLogin: true,
          })
        );

        if (responseData.gender && responseData.location) {
          navigate('/');
        } else {
          navigate(`/users/userInfo/${responseData.memberId}`);
        }
      } catch (error) {
        //가입안한거랑 비밀번호 틀린거랑 어떻게 구분하지? 에러코드가 다른가?
        // 가입안되어있으면 null오고
        // 비밀번호틀리면 401에러
        if (error.response.status === 401) {
          alert(error.response.message);
          // alert('비밀번호가 일치하지 않습니다');
        } else {
          alert(error.response.message);
          // alert('존재하지 않는 계정입니다.');
        }
      }
    }
  };

  return (
    <LoginContainer>
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
      </InputContainer>
      <LoginButtonContainer onClick={loginValidate}>로그인</LoginButtonContainer>
      <SignUpTextContainer>
        <div>
          처음이신가요? <a href="/users/signup">회원가입</a>으로 가기
        </div>
      </SignUpTextContainer>
      <OAuthButtonContainer>
        <OAuthButtonSection>Google</OAuthButtonSection>
        <OAuthButtonSection>Kakao</OAuthButtonSection>
        <OAuthButtonSection>Naver</OAuthButtonSection>
      </OAuthButtonContainer>
    </LoginContainer>
  );
};
export default Login;

const LoginContainer = styled.article`
  display: flex;
  flex-direction: column;
  margin: 3.125rem 1.875rem;
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
  border: 1px solid var(--color-gray);
  border-radius: 5px;
`;
const ErrorMessage = styled.div`
  margin: 6px 0 10px 0;
  color: var(--status-finished);
`;
const LoginButtonContainer = styled.button`
  height: 40px;
  margin: 10px 0 0 0;
  background-color: var(--color-orange);
  border-radius: 5px;
  color: white;
  font-weight: 800;
`;
const SignUpTextContainer = styled.section`
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
