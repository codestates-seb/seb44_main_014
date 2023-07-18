// 시간 노출 형식 변환 함수
export const timeStamp = (date: Date) => {
  const milliSeconds = +new Date() - +date;
  const seconds = milliSeconds / 1000;
  if (seconds < 60) return `방금 전`;
  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;
  const weeks = days / 7;
  if (weeks < 5) return `${Math.floor(weeks)}주 전`;
  const months = days / 30;
  if (months < 12) return `${Math.floor(months)}개월 전`;
  const years = days / 365;
  return `${Math.floor(years)}년 전`;
};

// get input checkbox, radio value
export const checkedValue = (e: React.MouseEvent<HTMLInputElement>) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    return target.value;
  } else {
    return '';
  }
};

// check only one input checkbox
export const selectOneCheckbox = (e: React.MouseEvent<HTMLInputElement>) => {
  const checkboxes = document.getElementsByName((e.target as HTMLInputElement).name);
  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i] !== e.target) {
      (checkboxes[i] as HTMLInputElement).checked = false;
    }
  }
};
