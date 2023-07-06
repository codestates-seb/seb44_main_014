import styled from 'styled-components';

const Alert = () => {
  return (
    <AlertContainer>
      <AlertMain>
        <AlertMainContent>
          회원탈퇴 <br /> 하시겠습니까?
        </AlertMainContent>
      </AlertMain>
      <AlertBtnContainer>
        <AlertBtn className="leftBtn" type="button">
          확인
        </AlertBtn>
        <AlertBtn type="button">취소</AlertBtn>
      </AlertBtnContainer>
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  width: 19.6875rem;
  height: 7.875rem;
  background-color: #fff;
  border: 1px solid var(--color-black);
  border-radius: 5px;
  margin-bottom: 5px;
`;

const AlertMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.3125rem;
`;

const AlertMainContent = styled.div`
  text-align: center;
  font-size: 14px;
`;

const AlertBtnContainer = styled.div`
  display: flex;
`;
const AlertBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 2.5rem;
  border-top: 1px solid var(--color-black);
  font-size: 0.875rem;

  &.leftBtn {
    border-right: 1px solid var(--color-black);
  }
  &:hover {
    background-color: var(--color-gray);
    &:nth-child(1) {
      border-bottom: 1px solid var(--color-black);
      border-radius: 0 0 0 0.3125rem;
    }
    &:nth-child(2) {
      border-bottom: 1px solid var(--color-black);
      border-radius: 0rem 0rem 0.3125rem 0rem;
    }
  }
`;

export default Alert;
