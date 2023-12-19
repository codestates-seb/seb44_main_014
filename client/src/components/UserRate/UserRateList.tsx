// packages
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
//components
import Star from './Star.tsx';

export interface IStarRate {
  rateMemberId: number;
  starRate: number;
}
interface IMateInfo {
  list: {
    memberId: number;
    name: string;
  };
}

const UserRateList = ({ list }: IMateInfo) => {
  const params = useParams();
  const postId = Number(params.postId);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [userRateInfo, setUserRateInfo] = useState<IStarRate>({
    rateMemberId: list.memberId,
    starRate: 5,
  });

  const postStarRate = () => {
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/posts/${postId}/mate/userRate`, userRateInfo)
      .then(() => {
        setIsSubmitted(true);
        handleDisableBtn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDisableBtn = () => {
    (document.getElementById(`btnSubmit${list.memberId}`) as HTMLButtonElement).disabled = true;
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <StarRateList>
      <RatingContainer>
        <Username>{list.name}</Username>
        {isSubmitted && <TextComplete>제출이 완료되었습니다.</TextComplete>}
        {!isSubmitted && (
          <div className="rating-group">
            {stars.map((num) => (
              <Star
                key={num}
                num={num}
                userRateInfo={userRateInfo}
                setUserRateInfo={setUserRateInfo}
                name={list.memberId}
              />
            ))}
          </div>
        )}
        <ButtonSave
          type="button"
          id={`btnSubmit${list.memberId}`}
          onClick={() => {
            postStarRate();
          }}
        >
          제출
        </ButtonSave>
      </RatingContainer>
    </StarRateList>
  );
};

const StarRateList = styled.li`
  margin-top: 1.875rem;
  .rating-group {
    display: inline-flex;
  }

  /* hide radio inputs */
  .rating__input {
    position: absolute !important;
    left: -9999px !important;
  }

  /* set icon padding and size */
  label {
    cursor: pointer;
    /* if you change the left/right padding, update the margin-right property of .rating__label--half as well. */
    padding: 0 0.4rem;
    font-size: 2.5rem;
  }

  /* set default star color */
  svg {
    color: #ffd233;
  }

  /* if any input is checked, make its following siblings grey */
  .rating__input:checked ~ label svg {
    color: #ddd;
  }

  /* make all stars orange on rating group hover */
  .rating-group:hover label svg {
    color: #ffd233;
  }

  /* make hovered input's following siblings grey on hover */
  .rating__input:hover ~ label svg {
    color: #ddd;
  }
`;

const TextComplete = styled.div`
  padding: 1.2rem 0;
  text-align: center;
`;

const RatingContainer = styled.div`
  width: 286px;
  margin: 0 auto;
`;

const Username = styled.span`
  display: block;
  margin-bottom: 1.125rem;
  padding: 0.5rem;
  font-size: 0.875rem;
`;

const ButtonSave = styled.button`
  width: 100%;
  height: 2.5rem;
  margin-top: 2rem;
  background-color: var(--color-orange);
  color: #ffffff;
  font-size: 1rem;
  border-radius: 5px;
  &:disabled {
    background-color: #aaa;
  }
`;

export default UserRateList;
