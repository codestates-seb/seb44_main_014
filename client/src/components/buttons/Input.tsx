import styled from 'styled-components';

const Input = () => {
  return <InputComponent type="text"></InputComponent>;
};

const InputComponent = styled.input`
  width: 19.6875rem;
  height: 2.25rem;
  border: 1px solid var(--color-gray);
  border-radius: 5px;
`;

export default Input;
