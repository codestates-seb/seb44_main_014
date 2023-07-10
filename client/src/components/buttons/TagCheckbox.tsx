import { styled } from 'styled-components';

type ChildrenProps = {
  children: string;
  type: string;
  value: number;
  handleGetValue: () => void;
};
const TagCheckbox = ({ children, type, handleGetValue, value }: ChildrenProps) => {
  return (
    <InputLabel htmlFor={children}>
      <InputCheckbox
        type="checkbox"
        name={type}
        id={children}
        value={value}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleGetValue(e)}
      />
      <TagSpan>{children}</TagSpan>
    </InputLabel>
  );
};

const InputLabel = styled.label`
  input[type='checkbox']:checked ~ span {
    background-color: var(--color-orange);
    color: #ffffff;
    border-radius: 0.3125rem;
  }
`;

const InputCheckbox = styled.input`
  position: absolute;
  height: 0;
  width: 0;
  opacity: 0;
  cursor: pointer;
`;

const TagSpan = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 5px;
  background-color: #ffffff;
  border-radius: 0.3125rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.25);
  color: #000000;
  font-size: 0.875rem;
  font-weight: 700;
  &:hover {
    background-color: var(--color-orange);
    color: #ffffff;
  }
`;

export default TagCheckbox;
