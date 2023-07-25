import * as React from 'react';
import { styled } from 'styled-components';
import { hideModal } from '../../util/common.ts';

/**
 * children: alert 내용
 * purpose: alert 목적 버튼 텍스트 ex) 저장, 삭제
 * purposeHandler: 목적 실행 함수
 * closeHandler: alert show, hide 제어 useState set 함수
 * hideModal: scrollLock 해제 함수
 */

interface IAlertProps {
  children: string;
  purpose: string;
  purposeHandler: () => void;
  closeHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertPopup = ({ children, purpose, purposeHandler, closeHandler }: IAlertProps) => {
  return (
    <AlertContainer>
      <AlertText>{children}</AlertText>
      <div>
        <ButtonDelete
          onClick={() => {
            purposeHandler();
            hideModal();
          }}
        >
          {purpose}
        </ButtonDelete>
        <ButtonCancel
          onClick={() => {
            closeHandler(false);
            hideModal();
          }}
        >
          취소
        </ButtonCancel>
      </div>
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 350px;
  background-color: var(--color-white);
  border-radius: 8px;
`;

const AlertText = styled.p`
  padding: 2.5rem 2rem;
  font-size: 0.875rem;
  text-align: center;
`;

const ButtonDelete = styled.button`
  width: 50%;
  padding: 1rem 0;
  border-top: 1px solid var(--color-gray);
  border-right: 1px solid var(--color-gray);
  border-radius: 0 0 0 0.5rem;
  font-size: 0.875rem;
  &:hover {
    background-color: var(--color-gray);
  }
`;

const ButtonCancel = styled.button`
  width: 50%;
  padding: 1rem 0;
  border-top: 1px solid var(--color-gray);
  font-size: 0.875rem;
  border-radius: 0 0 0.5rem 0;
  &:hover {
    background-color: var(--color-gray);
  }
`;

export default AlertPopup;
