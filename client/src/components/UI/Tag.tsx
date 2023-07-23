import { useState } from 'react';
import { styled } from 'styled-components';

const Tag = () => {
  const [isClicked, setIsClicked] = useState(true);

  const TagHandler = () => {
    setIsClicked(!isClicked);
  };

  return (
    <TagComponent onClick={TagHandler} value={isClicked}>
      # 한식
    </TagComponent>
  );
};

const TagComponent = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.125rem;
  height: 1.75rem;
  background-color: ${(props) => (props.value ? '#fff' : 'var(--color-orange)')};
  border: 1px solid;
  border-color: ${(props) => (props.value ? '#fff' : 'var(--color-orange)')};
  border-radius: 0.3125rem;
  box-shadow: 0.125rem 0.125rem rgba(0, 0, 0, 0.25);
  color: ${(props) => (props.value ? '#000' : '#fff')};
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: var(--color-orange);
    border-color: var(--color-orange);
    color: #fff;
  }
`;

export default Tag;
