import { useState } from 'react';
import { styled } from 'styled-components';
import DaumPostcode from 'react-daum-postcode';

declare global {
  interface Window {
    kakao: any;
  }
}
interface ILocation {
  latitude: number | null;
  longitude: number | null;
  address: string;
}
interface IZipCodeInputProps {
  location: ILocation;
  setLocation: React.Dispatch<React.SetStateAction<ILocation>>;
  locationErrMsg: string;
}
interface IGeocoderResult {
  x: number;
  y: number;
}
const ZipCodeInput: React.FC<IZipCodeInputProps> = ({ location, setLocation, locationErrMsg }) => {
  const [openPostcode, setOpenPostcode] = useState(false);

  const geocoder = new window.kakao.maps.services.Geocoder();

  const handle = {
    // 버튼 클릭 이벤트
    clickButton: () => {
      setOpenPostcode((current) => !current);
    },

    // 주소 선택 이벤트
    selectAddress: (data: any) => {
      let fullAddress = data.address;
      let extraAddress = '';

      const { addressType, bname, buildingName } = data;
      if (addressType === 'R') {
        if (bname !== '') {
          extraAddress += bname;
        }
        if (buildingName !== '') {
          extraAddress += `${extraAddress !== '' && ', '}${buildingName}`;
        }
        fullAddress += `${extraAddress !== '' ? ` ${extraAddress}` : ''}`;
      }

      geocoder.addressSearch(data.address, function (results: IGeocoderResult[], status: any) {
        // 정상적으로 검색이 완료됐으면
        if (status === window.kakao.maps.services.Status.OK) {
          const result = results[0]; //첫번째 결과의 값을 활용

          // 해당 주소에 대한 좌표를 받아서
          const coords = new window.kakao.maps.LatLng(result.y, result.x);
          // const message ='클릭한 위치의 위도는 ' + coords.getLat() + ' 이고, ' + '경도는 ' + coords.getLng() + ' 입니다';
          setLocation({ address: fullAddress, latitude: coords.getLat(), longitude: coords.getLng() });
        }
      });
      setOpenPostcode(false);
    },
  };

  return (
    <LocationContainer>
      <LocationTitle>지역 선택 *</LocationTitle>
      <LocationInputContainer>
        <LocationInput> {location.address}</LocationInput>
        <LocationButton onClick={handle.clickButton}>우편번호</LocationButton>
        <ErrorMessage>{locationErrMsg}</ErrorMessage>
      </LocationInputContainer>
      {openPostcode && (
        <DaumPostcode
          onComplete={handle.selectAddress} // 값을 선택할 경우 실행되는 이벤트
          autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
        />
      )}
    </LocationContainer>
  );
};
export default ZipCodeInput;

const LocationContainer = styled.section`
  width: 100%;
  margin: 0 0 20px 0;
`;
const LocationTitle = styled.div`
  margin: 0 0 10px 0;
`;
const LocationInputContainer = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LocationInput = styled.div`
  width: 100%;
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-gray);
`;
const LocationButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-orange);
  background: var(--color-orange);
  color: #fff;
  font-size: 14px;
  &:hover {
    background-color: #d8820a;
  }
`;
const ErrorMessage = styled.div`
  margin: 10px 0 10px 0;
  color: var(--status-finished);
`;
