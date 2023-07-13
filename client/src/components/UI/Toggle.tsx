import { useState } from 'react';
import { styled } from 'styled-components';

const Toggle = () => {
  const [isOn, setIsOn] = useState(true);

  const ToggleHandler = () => {
    setIsOn(!isOn);
  };

  return (
    <ToggleContainer onClick={ToggleHandler} value={isOn}>
      <ToggleBtn onClick={ToggleHandler} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.button`
  display: flex;
  justify-content: ${(props) => (props.value ? 'flex-start' : 'flex-end')};
  align-items: center;
  z-index: 0;
  width: 45px;
  height: 24px;
  background: ${(props) => (props.value ? 'var(--color-gray)' : 'var(--color-orange)')};
  border: 1px solid;
  border-color: ${(props) => (props.value ? 'var(--color-gray)' : 'var(--color-orange)')};
  border-radius: 1.25rem;
`;

const ToggleBtn = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 0.125rem;
  margin-right: 0.125rem;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
`;

export default Toggle;
