import { useSelector } from 'react-redux';
import AfterLogin from '../components/AfterLogin.tsx';
import Introduction from '../components/Introduction.tsx';
import { IUserState } from '../store/userSlice.ts';

const Main = () => {
  const isLoggedIn = useSelector((state: IUserState) => state.user.isLogin);

  return (
    <>
      {isLoggedIn && <AfterLogin />}
      {!isLoggedIn && <Introduction />}
    </>
  );
};

export default Main;
