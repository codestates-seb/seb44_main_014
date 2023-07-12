import { styled } from 'styled-components';
import { IMateMember } from '../../../interface/board.tsx';

interface IMate {
  findNum: number;
  mateNum: number;
}
interface IApplyParticipateProps {
  mate: IMate;
  mateMembers: IMateMember[];
  postApplyData: () => void;
  getDetailData: () => void;
}
const ApplyParticipate = ({ mate, mateMembers, postApplyData, getDetailData }: IApplyParticipateProps) => {
  // 임시 사용자 id
  const userId = 3;

  const showParticipant = mateMembers.filter((member) => member.mateMemberId === userId).length;

  return (
    <ParticipantContainer>
      <ApplyParticipant>
        모집인원
        <span>
          {mate.findNum} / {mate.mateNum}
        </span>
        <button
          type="button"
          onClick={() => {
            postApplyData();
            getDetailData();
          }}
        >
          신청
        </button>
      </ApplyParticipant>
      {showParticipant !== 0 && (
        <ParticipantId>
          <span>참가자: &nbsp;</span>
          {mateMembers.map((member, idx) => (
            <span key={idx}>&nbsp; {member.name}</span>
          ))}
        </ParticipantId>
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

const ParticipantId = styled.div`
  padding: 0.625rem;
  border: 1px solid var(--color-gray);
  border-radius: 0.625rem;
  font-size: 13px;
  span {
    color: var(--color-black);
  }
`;

export default ApplyParticipate;
