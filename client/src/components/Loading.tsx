import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
};

const spinner = keyframes`
    0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-green);
  border-top: 5px solid var(--color-orange);
  border-radius: 50%;
  animation: ${spinner} 1.2s linear infinite;
`;

export default Loading;
