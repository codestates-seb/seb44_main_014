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

const PageRouter = () => {
  return (
    <MainContainer>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/users/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/userInfo/:memberId" element={<UserInfo />} />
        <Route path="/users/mypage/:memberId" element={<Mypage />} />
        <Route path="/users/mypage/:memberId/edit" element={<EditUserInfo />} />
        <Route path="/questions/:questionId/mate" element={<UserRating />} />
        <Route
          path="/users/mypage/:memberId/questions
"
          element={<MoreInfoWritings />}
        />
        <Route
          path="/users/mypage/:memberId/comments
"
          element={<MoreInfoComments />}
        />
        <Route path="/board" element={<Board />} /> {/* 추후 수정 필요 */}
        <Route path="/board/posts/:postId" element={<BoardDetail />} />
        <Route path="/board/posts/:postId/edit" element={<EditBoard />} />
        <Route path="/board/posts" element={<PostBoard />} />
        <Route path="/location" element={<Location />} /> {/* 추후 수정 필요 */}
      </Routes>
    </MainContainer>
  );
};

const MainContainer = styled.main`
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`;

export default PageRouter;
