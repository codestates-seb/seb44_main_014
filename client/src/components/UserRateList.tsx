import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { checkedValue } from '../util/common.ts';

const UserRateList = ({ list }) => {
  const params = useParams();
  const postId = Number(params.postId);
  const [userRateInfo, setUserRateInfo] = useState({
    rateMemberId: list.memberId,
    starRate: '',
  });
  const postStarRate = () => {
    axios
      .post(`${import.meta.env.VITE_APP_API_URL}/posts/${postId}/mate/userRate`, userRateInfo)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userRateInfo);

  const handleRateValue = (e: React.MouseEvent<HTMLInputElement>) => {
    setUserRateInfo({ ...userRateInfo, starRate: checkedValue(e) });
  };
  return (
    <StarRateList>
      <RatingContainer>
        <Username>홍길동</Username>
        <div className="rating-group">
          <label aria-label="0.5 stars" className="rating__label--half" htmlFor="starRate05">
            <FontAwesomeIcon icon={faStarHalf} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate05"
            value="0.5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="1 star" htmlFor="starRate10">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate10"
            value="1"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="1.5 stars" className="rating__label--half" htmlFor="starRate15">
            <FontAwesomeIcon icon={faStarHalf} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate15"
            value="1.5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="2 stars" htmlFor="starRate20">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate20"
            value="2"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="2.5 stars" className="rating__label--half" htmlFor="starRate25">
            <FontAwesomeIcon icon={faStarHalf} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate25"
            value="2.5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="3 stars" htmlFor="starRate30">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate30"
            value="3"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="3.5 stars" className="rating__label--half" htmlFor="starRate35">
            <FontAwesomeIcon icon={faStarHalf} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate35"
            value="3.5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="4 stars" htmlFor="starRate40">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate40"
            value="4"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="4.5 stars" className="rating__label--half" htmlFor="starRate45">
            <FontAwesomeIcon icon={faStarHalf} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate45"
            value="4.5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
          <label aria-label="5 stars" htmlFor="starRate50">
            <FontAwesomeIcon icon={faStar} />
          </label>
          <input
            type="radio"
            className="rating__input"
            name="starRate"
            id="starRate50"
            value="5"
            onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
          />
        </div>
        <ButtonSave type="button" onClick={() => postStarRate()}>
          저장
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

  /* add padding and positioning to half star labels */
  .rating__label--half {
    padding-right: 0;
    margin-right: -1.3em;
    z-index: 2;
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
  .rating-group:hover label svg,
  .rating-group:hover .rating__label--half svg {
    color: #ffd233;
  }

  /* make hovered input's following siblings grey on hover */
  .rating__input:hover ~ label svg,
  .rating__input:hover ~ .rating__label--half svg {
    color: #ddd;
  }
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
  margin-top: 1.125rem;
  background-color: var(--color-orange);
  color: #ffffff;
  font-size: 1rem;
  border-radius: 5px;
`;

export default UserRateList;
