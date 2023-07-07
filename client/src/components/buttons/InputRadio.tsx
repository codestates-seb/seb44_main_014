import { styled } from 'styled-components';

type ChildrenProps = {
  children: string;
  type: string;
  handleGetValue: () => void;
};
const InputRadio = ({ children, type, handleGetValue }: ChildrenProps) => {
  return (
    <InputLabel htmlFor={children}>
      {children}
      <RadioInput
        type="radio"
        name={type}
        id={children}
        value={children}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleGetValue(e)}
      />
      <Checkmark />
    </InputLabel>
  );
};

const InputLabel = styled.label`
  position: relative;
  display: block;
  padding-left: 1.875rem;
  font-size: 0.875rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  input[type='radio']:checked ~ span {
    background-image: url('/img/radio_selected.png');
  }
`;

const RadioInput = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  cursor: pointer;
`;

const Checkmark = styled.span`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  background-image: url('/img/radio_unselected.png');
  background-size: cover;
  border-radius: 50%;
`;

export default InputRadio;
