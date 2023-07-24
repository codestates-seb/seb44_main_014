import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import Button from '../components/UI/Button.tsx';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ILocationState, locationPost } from '../store/locationSlice.ts';
import { useNavigate } from 'react-router-dom';
import { IUserState } from '../store/userSlice.ts';

declare global {
  interface Window {
    kakao: any;
  }
}
interface IKakaoGeocoderResult {
  road_address: {
    address_name: string;
  };
  address: {
    address_name: string;
  };
}
interface IKakaoMouseEvent {
  latLng: {
    getLat: () => number;
    getLng: () => number;
  };
}

const Location = () => {
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const locationId = useSelector((state: ILocationState) => state.location.locationId);
  const isLogin = useSelector((state: IUserState) => state.user.isLogin);

  useEffect(() => {
    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(37.563115742175256, 126.9226833612614), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    //////////////////////////////////////
    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    const mapTypeControl = new window.kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    //////////////////////////////////////
    // 마커가 표시될 위치입니다
    const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);

    // 마커를 생성합니다
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);

    function getAddr(lat: number, lng: number) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const coord = new window.kakao.maps.LatLng(lat, lng);
      const callback = function (result: IKakaoGeocoderResult[], status: any) {
        if (status === window.kakao.maps.services.Status.OK) {
          //window.kakao.maps.services.Status
          //KakaoGeocoderStatus
          const addr = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;
          console.log(addr);
          setAddress(addr);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
    }

    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: IKakaoMouseEvent) {
      // 클릭한 위도, 경도 정보를 가져옵니다
      const latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);

      // 마우스로 클릭한 위치의 위도와 경도를 표시할 메세지
      const message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ' + '경도는 ' + latlng.getLng() + ' 입니다';

      console.log(message);

      setCoordinate({ latitude: latlng.getLat(), longitude: latlng.getLng() });
      getAddr(latlng.getLat(), latlng.getLng());
    });
  }, []);

  const saveLocation = (latitude: number, longitude: number, address: string) => {
    try {
      dispatch(locationPost({ locationId: locationId, address: address }));
      const response = axios.patch(`${import.meta.env.VITE_APP_API_URL}${locationId}`, {
        latitude,
        longitude,
        address,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLocationChange = () => {
    if (address && isLogin) {
      saveLocation(coordinate.latitude, coordinate.longitude, address);
      alert('위치가 저장되었습니다.');
      navigate('/');
    } else if (!isLogin) {
      alert('로그인 후 사용가능합니다.');
      navigate('/login');
    } else {
      alert('위치를 선택해주세요.');
    }
  };

  return (
    <>
      <LocationPageContainer>
        <LocationPageTitle>원하는 장소를 선택해주세요.</LocationPageTitle>
        {/* <div>x좌표:{coordinate.latitude}</div>
        <div>y좌표:{coordinate.longitude}</div> */}
        <MapContainer>
          <Map id="map"></Map>
        </MapContainer>
        <AddressContainer>주소:{address}</AddressContainer>
        <ButtoneContainer>
          <Button onClick={handleLocationChange}>위치저장</Button>
        </ButtoneContainer>
      </LocationPageContainer>
    </>
  );
};

export default Location;

const LocationPageContainer = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
`;

const LocationPageTitle = styled.section`
  font-size: 20px;
  margin: 30px 0;
`;

const MapContainer = styled.section`
  display: flex;
  justify-content: center;
`;
const Map = styled.section`
  width: 315px;
  height: 315px;
  @media screen and (min-width: 768px) {
    width: 500px;
    height: 500px;
  }
`;
const AddressContainer = styled.section`
  max-width: 500px;
  width: 315px;
  height: 36px;
  border-radius: 5px;
  border: 1px solid var(--color-gray);
  display: flex;
  align-items: center;
  margin: 30px 0;
  padding-left: 10px;
  @media screen and (min-width: 768px) {
    width: 500px;
    margin: 50px auto;
  }
`;
const ButtoneContainer = styled.section`
  display: flex;
  justify-content: center;
  @media screen and (min-width: 768px) {
    margin: 0 0 50px 0;
    button {
      width: 500px;
    }
  }
`;
