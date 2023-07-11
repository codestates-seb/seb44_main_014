import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Tag from '../components/UI/Tag.tsx';
import Toggle from '../components/UI/Toggle.tsx';

const Mypage = () => {
  return (
    <BodyContainer>
      <UserProfileContainer>
        <UserImageContainer>
          <UserImage></UserImage>
        </UserImageContainer>
        <UserInfoContainer>
          <UserContents className={'InfoContents'}>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>이름</UserInfoTitle>
              <UserInfoParagraph>홍길동</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>이메일</UserInfoTitle>
              <UserInfoParagraph>aaaa@aaaaa.com</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle>매너 별점</UserInfoTitle>
              <UserInfoParagraph>4.6</UserInfoParagraph>
            </UserContentsContainer>
            <UserContentsContainer className={'Tag'}>
              <UserInfoTitle className={'Tag'}>태그</UserInfoTitle>
              <Tag className={'Tag'}>4.6</Tag>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Quite'}>조용히 밥만 먹어요</UserInfoTitle>
              <Toggle>4.6</Toggle>
            </UserContentsContainer>
            <UserContentsContainer className={'InfoContainer'}>
              <UserInfoTitle className={'Edit'}>
                <Link to="/users/mypage/:memberId/edit">프로필 수정</Link>
              </UserInfoTitle>
            </UserContentsContainer>
          </UserContents>
        </UserInfoContainer>
      </UserProfileContainer>
      <UserContainer className={'MeetingContainer'}>
        <UserContentsTitle>참여 중인 모임</UserContentsTitle>
        <UserContentBox className={'MeetingBox'}>
          <UserContents>
            <UserContentsBoxTitle>
              <Link to="/board">연남동 OO라멘 2인 선착순!</Link>
            </UserContentsBoxTitle>
            <UserContentsBoxParagraph>참여자: 마포호랑이 마포호랑이 마포호랑이</UserContentsBoxParagraph>
          </UserContents>
        </UserContentBox>
      </UserContainer>
      <UserContainer className={'PostsContainer'}>
        <UserContentsContainer>
          <UserContentsTitle>작성한 게시글</UserContentsTitle>
          <Link to="/users/mypage/:memberId/questions">
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
        <UserContentBox className={'PostsBox'}>
          <UserContents>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">연남동 OO라멘 2인 선착순!</Link>
              </UserContentsBoxTitle>
              <UserContentsBoxParagraph>모집완료</UserContentsBoxParagraph>
            </UserContentsContainer>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">서교동 무한리필 고깃집 4인 구해요~</Link>
              </UserContentsBoxTitle>
              <UserContentsBoxParagraph>모집완료</UserContentsBoxParagraph>
            </UserContentsContainer>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">강남 XX버거 같이 웨이팅하실 분!!</Link>
              </UserContentsBoxTitle>
              <UserContentsBoxParagraph>모집완료</UserContentsBoxParagraph>
            </UserContentsContainer>
          </UserContents>
        </UserContentBox>
      </UserContainer>
      <UserContainer className={'PostsContainer'}>
        <UserContentsContainer>
          <UserContentsTitle>작성한 댓글</UserContentsTitle>
          <Link to="/users/mypage/:memberId/questions">
            <UserContentsBoxParagraph className={'MoreInfoLink'}>더보기</UserContentsBoxParagraph>
          </Link>
        </UserContentsContainer>
        <UserContentBox className={'PostsBox'}>
          <UserContents>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">저요저요!</Link>
              </UserContentsBoxTitle>
            </UserContentsContainer>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">혹시 자리 있나요?</Link>
              </UserContentsBoxTitle>
            </UserContentsContainer>
            <UserContentsContainer>
              <UserContentsBoxTitle>
                <Link to="/board">저도 초밥 좋아해요 ㅎㅎㅎ</Link>
              </UserContentsBoxTitle>
            </UserContentsContainer>
          </UserContents>
        </UserContentBox>
      </UserContainer>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  margin: 3.125rem;
  min-height: 1000px;
`;

const UserProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20.625rem;
  margin-bottom: 80px;
`;

const UserImageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 20.625rem;
  height: 20.625rem;
`;

const UserImage = styled.div`
  width: 250px;
  height: 250px;
  padding: 50px;
  background: black;
  border-radius: 50%;
`;

const UserInfoContainer = styled.div`
  width: 1090px;
  min-width: 600px;
  height: 350px;
  border: 1px solid var(--color-gray);
  border-radius: 10px;
`;

const UserInfoTitle = styled.h1`
  display: flex;
  width: 70px;
  margin-bottom: 30px;
  font-size: 16px;

  &.Tag {
    width: 100%;
    margin-bottom: 10px;
  }
  &.Quite {
    align-items: center;
    width: 150px;
    height: 24px;
  }
  &.Edit {
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 0;
  }
`;

const UserInfoParagraph = styled.p`
  margin-left: 30px;
  font-size: 15px;
`;

const UserContainer = styled.div`
  width: 100%;
  margin-bottom: 50px;

  &.MeetingContainer {
    height: 120px;
  }
  &.PostsContainer {
    height: 160px;
  }
`;

const UserContentsTitle = styled.h1`
  padding-left: 10px;
  padding-bottom: 10px;
  height: 30px;
  font-size: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 0;
    font-size: 16px;
  }
`;

const UserContentBox = styled.div`
  border: 1px solid var(--color-gray);
  border-radius: 10px;

  &.MeetingBox {
    height: 90px;
  }
  &.PostsBox {
    height: 130px;
  }
`;

const UserContents = styled.div`
  padding: 20px;

  &.InfoContents {
    padding: 30px;
  }
`;

const UserContentsBoxTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 16px;

  @media (max-width: 1024px) {
    font-size: 14px;
  }
`;

const UserContentsBoxParagraph = styled.p`
  color: var(--color-black);
  font-size: 14px;
  word-spacing: 10px;

  @media (max-width: 1024px) {
    font-size: 13px;
  }

  &.MoreInfoLink {
    margin-right: 20px;
    padding-top: 5px;
  }
`;

const UserContentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  &.InfoContainer {
    justify-content: flex-start;
  }
  &.Tag {
    flex-wrap: wrap;
    margin-bottom: 30px;
  }
`;

export default Mypage;
