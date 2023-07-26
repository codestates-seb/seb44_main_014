import * as React from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { IParticipants } from '../../../interface/board.ts';

interface IProfilePopupProps {
  className: string;
  userInfo: IParticipants;
  handleShowProfile: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IStyledProps {
  $isActive: boolean;
}

const ProfilePopup = ({ className, userInfo, handleShowProfile }: IProfilePopupProps) => {
  const { name, image, gender, eatStatus, avgStarRate } = userInfo;

  let userGender: string;
  if (gender === 'FEMALE') {
    userGender = '여성';
  } else {
    userGender = '남성';
  }

  let profileImage: string;
  if (!image) {
    profileImage = 'https://bobimage.s3.ap-northeast-2.amazonaws.com/member/defaultProfile.png';
  } else {
    profileImage = image;
  }

  return (
    <ProfileContainer className={className}>
      <ButtonClose onClick={() => handleShowProfile(false)}>
        <FontAwesomeIcon icon={faXmark} />
      </ButtonClose>
      <ImgContainer>
        <img src={profileImage} alt="User profile" />
      </ImgContainer>
      <ProfileInfo>
        <InfoRow>
          <InfoId>{name}</InfoId>
          <InfoScore>
            <FontAwesomeIcon icon={faStar} style={{ color: '#FFD233' }} /> {avgStarRate.toFixed(1)}
          </InfoScore>
        </InfoRow>
        <InfoRow>
          <InfoGender>{userGender}</InfoGender>
          <InfoMode $isActive={eatStatus}>조용히 밥만 먹어요</InfoMode>
        </InfoRow>
      </ProfileInfo>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 200px;
  padding: 1.25rem 1.25rem 1.875rem;
  background-color: #ffffff;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  z-index: 10;

  &.comment {
    left: 0;
    top: 40px;
    transform: translateX(0);
  }
`;

const ButtonClose = styled.button`
  margin-left: auto;
  margin-bottom: 0.625rem;
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  border: 1px solid var(--color-gray);
  overflow: hidden;
  img {
    display: block;
    width: 100%;
  }
`;

const ProfileInfo = styled.div`
  width: 225px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
  font-size: 13px;
  &:last-of-type {
    flex-direction: column;
    margin-top: 0.625rem;
  }
`;

const InfoId = styled.span`
  margin-right: 0.625rem;
`;

const InfoScore = styled.span`
  color: var(--color-black);
  svg {
    margin-right: 0.25rem;
  }
`;

const InfoGender = styled.span`
  color: var(--color-black);
`;

const InfoMode = styled.span<IStyledProps>`
  position: relative;
  margin-top: 1.25rem;
  font-size: 0.875rem;
  /* z-index: -1; */
  color: ${(props) => (props.$isActive === true ? '#000000' : '#555555')};
  &::after {
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${(props) => (props.$isActive === true ? '#28CA6B' : '#EE3D16')};
    border-radius: 5px;
  }
`;

export default ProfilePopup;
