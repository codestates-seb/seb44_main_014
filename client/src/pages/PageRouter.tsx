import { Routes, Route } from 'react-router-dom';
import { styled } from 'styled-components';

import Main from './Main.tsx';
import SignUp from './SignUp.tsx';
import Login from './Login.tsx';
import UserInfo from './UserInfo.tsx';
import Board from './Board.tsx';
import BoardDetail from './BoardDetail.tsx';
import PostBoard from './PostBoard.tsx';
import EditBoard from './EditBoard.tsx';
import Location from './Location.tsx';
import Mypage from './Mypage.tsx';
import EditUserInfo from './EditUserInfo.tsx';
import MoreInfoComments from './MoreInfoComments.tsx';
import MoreInfoWritings from './MoreInfoWritings.tsx';
import UserRating from './UserRating.tsx';
import PageNotFound from './PageNotFound.tsx';
import useLogoutAndRedirect from '../components/Logout/useLogout.tsx';

const PageRouter = () => {
  useLogoutAndRedirect();
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/userInfo/:memberId" element={<UserInfo />} />
        <Route path="/users/mypage/:memberId" element={<Mypage />} />
        <Route path="/users/mypage/:memberId/edit" element={<EditUserInfo />} />
        <Route path="/board/post/:postId/mate" element={<UserRating />} />
        <Route path="/users/mypage/:memberId/questions" element={<MoreInfoWritings />} />
        <Route path="/users/mypage/:memberId/comments" element={<MoreInfoComments />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/posts/:postId" element={<BoardDetail />} />
        <Route path="/board/posts/:postId/edit" element={<EditBoard />} />
        <Route path="/board/posts" element={<PostBoard />} />
        <Route path="/location" element={<Location />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  width: 100%;
  min-height: calc(100vh - 200px);
  margin: 0 auto;
  box-sizing: border-box;
  @media screen and (min-width: 1024px) {
    min-height: calc(100vh - 220px);
  }
`;

export default PageRouter;
