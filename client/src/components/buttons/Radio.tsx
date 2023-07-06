import styled from 'styled-components';

const Radio = () => {
  return (
    <Form method="get" action="form-action.html">
      <Label htmlFor="밥 먹기">
        <Input type="radio" name="options" value="밥 먹기" id="밥 먹기" checked />
        <RadioBox></RadioBox>
        <Paragraph>밥 먹기</Paragraph>
      </Label>
      <Label htmlFor="장 보기">
        <Input type="radio" name="options" value="장 보기" id="장 보기" />
        <RadioBox></RadioBox>
        <Paragraph>장 보기</Paragraph>
      </Label>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  width: 4.6875rem;
  margin-bottom: 1rem;
  margin-right: 0.9375rem;
  cursor: pointer;
`;

const Paragraph = styled.p`
  margin-left: 0.2rem;
  font-size: 0.875rem;
`;

const RadioBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.4rem;
  padding: 2px;
  border: 1px solid #b9bdcf;
  border-radius: 50%;
  transition: background 0.15s, border-color 0.15s;
  cursor: pointer;

  &::after {
    display: block;
    width: 100%;
    height: 100%;
    background: var(--color-orange);
    border-radius: 50%;
    cursor: pointer;
    content: '';
    transform: scale(0);
  }
`;

const Input = styled.input`
  display: none;
  &:checked + ${RadioBox} {
    &::after {
      transform: scale(1);
    }
  }
`;

// const RadioComponent = styled.input`
//   width: 1.25rem;
//   height: 1.25rem;

//   &:checked {
//     background-image: url(../../../../public/img/circle-dot-regular.svg);
//   }
// `;

export default Radio;
