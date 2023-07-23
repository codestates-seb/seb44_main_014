import { styled } from 'styled-components';

interface IMember {
  memberId: number;
  name: string;
}

interface IMate {
  findNum: number;
  mateNum: number;
}
interface IApplyParticipateProps {
  postApplyData: () => void;
  getDetailData: () => void;
  updateMate: IMate;
  showParticipant: number;
  mateData: IMember[];
}
const ApplyParticipate = ({ postApplyData, updateMate, showParticipant, mateData }: IApplyParticipateProps) => {
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
      {showParticipant !== 0 && (
        <ParticipantId>
          <span>참가자: &nbsp;</span>
          {mateData.map((mate, idx) => (
            <span key={idx}>&nbsp; {mate.name}</span>
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
