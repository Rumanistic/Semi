import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EventDetail.css';
import Review from './Review';

function EventDetail() {
  const { no } = useParams(); // URL에서 이벤트 번호를 가져옴
  const [event, setEvent] = useState(null);
  // a,b,c,d
  const [imageList, setImageList] = useState([]);

  // 페이지 리스트 렌더링
  useEffect(() => {
    console.log(no);
    axios.get(`/detail/${no}`)
      .then(result => setEvent(result.data));
  }, [no]);

    // 파일명을 받아와서 split으로 분리하는 로직
    // const getImagePath = (imageName) => {
    //   if (!imageName) return ''; // 이미지 이름이 없으면 빈 문자열 반환
  
    //   // 파일명과 확장자를 분리할 때, 필요에 따라 확장자를 붙임
    //   const imageParts = imageName.split('_');
      
 
    //   const fileName = `${imageParts.join('_')}.jpg`;
    //   return `/images/events/${event.eventNo}/${fileName}`;
    // };

          //  {/* DB에 저장된 파일명을 기반으로 이미지 경로를 생성 */}
          //  {event.mainImage && (
          //   <img 
          //     src={getImagePath(event.mainImage)}  // split으로 분리 후 경로 생성
          //     alt="Main Event" 
          //     className="event-main-image" 
          //   />
          // )}
          // {event.subImage1 && (
          //   <img 
          //     src={getImagePath(event.subImage1)}  // split으로 분리 후 경로 생성
          //     alt="Sub Image 1" 
          //     className="event-sub-image" 
          //   />
          // )}

  return (
    <div>
      {event ? (
         <div className="event-container">
         {/* 이미지 출력 */}
         <div className="event-images">
          {() => {
          }}
         </div>

          <h1>{event.title}</h1>
          
          <div className="event-detail-item">
            <h3>운영 날짜</h3>
            <p>{event.startDate} - {event.endDate}</p>
          </div>

          <div className="event-detail-item">
            <h3>운영 시간</h3>
            <p>{event.openTime} ~ {event.closeTime}</p>
          </div>

          <div className="event-detail-item">
            <h3>상세 정보</h3>
            <p>{event.content}</p>
          </div>

          <div className="event-detail-item">
            <h3>위치</h3>
            <p>{event.location}</p>
          </div>

          <div className="event-detail-item">
            <h3>안내 및 주의사항</h3>
            <p>{event.caution}</p>
          </div>

          <Review eventNo={event.eventNo} eventTitle={event.title}/>
        </div>
      ) : (
        <p>이벤트 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default EventDetail;
