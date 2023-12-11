// packages
import { useSelector } from 'react-redux';
// components
import AfterLogin from '../components/Main/AfterLogin.tsx';
import Introduction from '../components/Main/Introduction.tsx';
// custom files
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
