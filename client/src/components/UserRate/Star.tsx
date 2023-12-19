// packages
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
// custom files
import { checkedValue } from '../../util/common.ts';
import { IStarRate } from './UserRateList.tsx';

interface IStarProps {
  num: number;
  userRateInfo: IStarRate;
  setUserRateInfo: React.Dispatch<React.SetStateAction<IStarRate>>;
  name: number;
}

const Star = ({ num, userRateInfo, setUserRateInfo, name }: IStarProps) => {
  const handleRateValue = (e: React.MouseEvent<HTMLInputElement>) => {
    setUserRateInfo({ ...userRateInfo, starRate: Number(checkedValue(e)) });
  };

  return (
    <>
      <label aria-label={`${num} star`} htmlFor={`starRate${num}`}>
        <FontAwesomeIcon icon={faStar} />
      </label>
      <input
        type="radio"
        className="rating__input"
        name={`starRate${name}`}
        id={`starRate${num}`}
        value={num}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => handleRateValue(e)}
      />
    </>
  );
};

export default Star;
