// packages
import { memo } from 'react';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
//custom files
import { Gender } from '../../../enum/gender.ts';

type ProfileInfoProps = {
  profileInfo: {
    memberId: number;
    image?: string;
    name: string;
    gender: string;
    avgStarRate: number;
    eatStatus: boolean;
  };
};

interface IStyledProps {
  $isActive: boolean;
}

const WriterProfile = memo(({ profileInfo }: ProfileInfoProps) => {
  const { name, gender, image, avgStarRate, eatStatus } = profileInfo;

  let userGender: string;
  if (gender === 'FEMALE') {
    userGender = Gender.FEMALE;
  } else {
    userGender = Gender.MALE;
  }

  let profileImage: string;
  if (!image) {
    profileImage = 'https://bobimage.s3.ap-northeast-2.amazonaws.com/member/defaultProfile.png';
  } else {
    profileImage = image;
  }

  return (
    <ProfileContainer>
      <img src={profileImage} alt="User profile" />
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
});

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 315px;
  margin-top: 1.25rem;
  margin-left: auto;
  padding: 1.25rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  img {
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 1.25rem;
    border-radius: 50%;
    border: 0.5px solid #cccccc;
    @media screen and (min-width: 1024px) {
      width: 100px;
      height: 100px;
      margin: 0 auto;
    }
  }
  @media screen and (min-width: 1024px) {
    flex-direction: column;
    width: 200px;
    margin-top: 1.875rem;
    margin-left: 20px;
    padding: 1.875rem 1.25rem;
  }
`;

const ProfileInfo = styled.div`
  width: 225px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  &:last-of-type {
    margin-top: 0.625rem;
    @media screen and (min-width: 1024px) {
      flex-direction: column;
    }
  }
  @media screen and (min-width: 1024px) {
    justify-content: center;
    margin-top: 1.25rem;
  }
`;

const InfoId = styled.span`
  @media screen and (min-width: 1024px) {
    margin-right: 0.625rem;
  }
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
  font-size: 13px;
  z-index: -1;
  color: ${(props) => (props.$isActive === true ? '#000000' : '#555555')};
  &::after {
    position: absolute;
    left: -0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    content: '';
    width: 6px;
    height: 6px;
    background-color: ${(props) => (props.$isActive === true ? '#28CA6B' : '#EE3D16')};
    border-radius: 5px;
  }
  @media screen and (min-width: 1024px) {
    margin-top: 1.25rem;
    font-size: 0.875rem;
    &::after {
      left: -1rem;
    }
  }
`;

export default WriterProfile;
