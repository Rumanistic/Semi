import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EventDetail.css';

function EventDetail() {
  const { eventNo } = useParams(); // URL에서 이벤트 번호를 가져옴
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventNo) {
      axios.get(`/event/${eventNo}`)
        .then(response => {
          setEvent(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('이벤트 상세 정보를 가져오는 중 오류가 발생했습니다.', error);
          setLoading(false);
        });
    }
  }, [eventNo]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <div className="event-container">
      {event ? (
        <div>
          <h1>{event.title}</h1>
          <h3>운영 날짜</h3>
          <p>{event.startDate} - {event.endDate}</p>
          
          <h3>운영 시간</h3>
          <p>{event.openTime} ~ {event.closeTime}</p>

          <h3>상세 정보</h3>
          <p>{event.content}</p>

          <h3>위치</h3>
          <p>{event.location}</p>
          
          <h3>SNS</h3>
          <p>
            <a
              href={event.sns}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ marginLeft: "10px" }}
            >
              링크 열기
            </a>
          </p>
          
          {/* 리뷰 페이지로 이동하는 버튼 (이벤트 제목을 URL로 넘김) */}
          <div>
            <button
              className="btn"
              onClick={() => navigate(`/review/${encodeURIComponent(event.title)}`)} // 제목을 URL 파라미터로 전달
              style={{ marginTop: "20px" }}
            >
              리뷰 보기
            </button>
          </div>
        </div>
      ) : (
        <p>이벤트 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default EventDetail;
