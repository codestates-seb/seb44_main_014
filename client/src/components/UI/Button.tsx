import { styled } from 'styled-components';

interface ButtonProps {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <BtnComponent type="button" onClick={onClick}>
      {children}
    </BtnComponent>
  );
};

const BtnComponent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19.6875rem;
  height: 2.5rem;
  background-color: var(--color-orange);
  border: 1px solid var(--color-orange);
  border-radius: 0.3125rem;
  color: #fff;
  font-size: 1rem;

  &:hover {
    background-color: #d8820a;
  }
`;

export default Button;
