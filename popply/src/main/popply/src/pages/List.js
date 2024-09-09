import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function List() {
  const [events, setEvents] = useState([]); // 이벤트 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 오류 상태

  useEffect(() => {
    // API 호출 (localhost:8080 명시하지 않음, 프록시 설정에 의존)
    axios.get('/event/list') 
      .then(response => {
        setEvents(response.data); // 이벤트 목록 상태에 저장
        setLoading(false);
      })
      .catch(error => {
        setError('이벤트 데이터를 가져오는 중 오류가 발생했습니다.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>이벤트 목록</h1>
      <ul>
        {events.map(event => (
          <li key={event.eventNo}>
            <Link to={`/event/${event.eventNo}`}
			onClick={console.log('list.js: ',event.eventNo)}>{event.title}</Link> {/* 제목 클릭 시 상세 페이지로 이동 */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
