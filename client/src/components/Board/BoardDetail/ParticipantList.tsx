import { useState } from 'react';
import { styled } from 'styled-components';
import ProfilePopup from './ProfilePopup.tsx';
import { IParticipants } from '../../../interface/board.ts';

interface IParticipantListProps {
  children: string;
  mate: IParticipants;
}

const ParticipantList = ({ children, mate }: IParticipantListProps) => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  return (
    <>
      <ParticipantId onClick={() => setShowProfile(true)}>{children}</ParticipantId>
      {showProfile && <ProfilePopup className={'participant'} userInfo={mate} handleShowProfile={setShowProfile} />}
    </>
  );
};

const ParticipantId = styled.span`
  margin-left: 0.5rem;
  color: var(--color-black);
  cursor: pointer;
`;

export default ParticipantList;
