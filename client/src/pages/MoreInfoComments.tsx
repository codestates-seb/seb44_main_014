import { styled } from 'styled-components';

const MoreInfoComments = () => {
  return (
    <WritingsContainer>
      <WritingsTitle>작성한 댓글</WritingsTitle>
      <WritingContentsContainer>
        <ContentsTitle>저요저요</ContentsTitle>
        <ContentsParagraph>연남동 OO라멘 2인 선착순!</ContentsParagraph>
      </WritingContentsContainer>
      <WritingContentsContainer>
        <ContentsTitle>저요저요</ContentsTitle>
        <ContentsParagraph>연남동 OO라멘 2인 선착순!</ContentsParagraph>
      </WritingContentsContainer>
      <WritingContentsContainer>
        <ContentsTitle>저요저요</ContentsTitle>
        <ContentsParagraph>연남동 OO라멘 2인 선착순!</ContentsParagraph>
      </WritingContentsContainer>
      <WritingContentsContainer>
        <ContentsTitle>저요저요</ContentsTitle>
        <ContentsParagraph>연남동 OO라멘 2인 선착순!</ContentsParagraph>
      </WritingContentsContainer>
      <WritingContentsContainer>
        <ContentsTitle>저요저요</ContentsTitle>
        <ContentsParagraph>연남동 OO라멘 2인 선착순!</ContentsParagraph>
      </WritingContentsContainer>
    </WritingsContainer>
  );
};

const WritingsContainer = styled.div`
  height: 500px;
  margin: 50px;
`;

const WritingsTitle = styled.h1`
  height: 30px;
  margin-bottom: 10px;
  font-size: 20px;
`;

const WritingContentsContainer = styled.div`
  height: 90px;
  border-top: 1px solid var(--color-gray);
  padding: 20px 60px;

  &:last-child {
    border-bottom: 1px solid var(--color-gray);
  }
`;

const ContentsTitle = styled.h1`
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: bold;
`;

const ContentsParagraph = styled.p`
  font-size: 14px;
`;

export default MoreInfoComments;
