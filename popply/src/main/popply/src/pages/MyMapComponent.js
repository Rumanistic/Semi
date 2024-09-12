import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

// 지도의 크기 설정
const containerStyle = {
  width: '100%',
  height: '400px'
};

function MyMapComponent({ address }) {
  const [mapCenter, setMapCenter] = useState(null); // 지도 중심 위치 저장
  const [markerPosition, setMarkerPosition] = useState(null); // 마커 위치 저장

  useEffect(() => {
    if (address) {
      // Geocoding API로 주소를 위도와 경도로 변환
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address, // 이벤트에 저장된 주소
          key: 'YOUR_GOOGLE_MAPS_API_KEY' // Google Maps API 키
        }
      })
      .then(response => {
        if (response.data.results.length > 0) {
          const location = response.data.results[0].geometry.location;
          setMapCenter({ lat: location.lat, lng: location.lng });
          setMarkerPosition({ lat: location.lat, lng: location.lng });
        } else {
          console.error('Geocoding failed: No results found');
        }
      })
      .catch(error => {
        console.error('Geocoding API error:', error);
      });
    }
  }, [address]);

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      {mapCenter && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter}
          zoom={15} // 줌 레벨
        >
          {markerPosition && <Marker position={markerPosition} />} {/* 마커 표시 */}
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default MyMapComponent;
