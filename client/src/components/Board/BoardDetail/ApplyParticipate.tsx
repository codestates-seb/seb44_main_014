import { useSelector } from 'react-redux';
import { styled } from 'styled-components';

import ParticipantList from './ParticipantList.tsx';
import { IUserState } from '../../../store/userSlice.ts';
import { IParticipants } from '../../../interface/board.ts';

interface IMate {
  findNum: number;
  mateNum: number;
}
interface IApplyParticipateProps {
  postApplyData: () => void;
  updateMate: IMate;
  showParticipant: number;
  mateData: IParticipants[];
  memberId: number;
}
const ApplyParticipate = ({
  postApplyData,
  updateMate,
  showParticipant,
  mateData,
  memberId,
}: IApplyParticipateProps) => {
  const userId = useSelector((state: IUserState) => state.user.memberId);

  return (
    <ParticipantContainer>
      <ApplyParticipant>
        모집인원
        <span>
          {updateMate.findNum} / {updateMate.mateNum}
        </span>
        <button
          type="button"
          onClick={() => {
            postApplyData();
          }}
        >
          신청
        </button>
      </ApplyParticipant>
      {/* 작성자 및 참가자에게만 노출 */}
      {(showParticipant !== 0 || (memberId === userId && mateData.length !== 0)) && (
        <ParticipantIdArea>
          <span>참가자: &nbsp;</span>
          {mateData.map((mate, idx) => (
            <ParticipantList key={idx} mate={mate}>
              {mate.name}
            </ParticipantList>
          ))}
        </ParticipantIdArea>
      )}
    </ParticipantContainer>
  );
};

const ParticipantContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1.25rem;
`;

const ApplyParticipant = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.625rem;
  font-size: 13px;
  span {
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
  button {
    margin-right: 1.25rem;
    padding: 5px;
    background-color: #b3b3b3;
    border-radius: 5px;
    color: #ffffff;
    &:hover {
      background-color: var(--color-orange);
    }
  }
`;

const ParticipantIdArea = styled.div`
  position: relative;
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 13px;
  span {
    color: var(--color-black);
  }
`;

export default ApplyParticipate;
