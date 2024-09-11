import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetail.css';
import Review from './Review';

function EventDetail() {
  const { no } = useParams(); // URL에서 이벤트 번호를 가져옴


  const [event, setEvent] = useState(null);


  
  	// 페이지 리스트 렌더링
	useEffect(() => {
		console.log(no)
		axios.get(`/detail/${no}`)
				 .then(result => setEvent(result.data));
	}, [no])


  return (
    <div>
      {event ? (
        <div className="event-container">
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
