import React from 'react';
import { useParams } from 'react-router-dom';

function Review() {
  const { eventNo } = useParams(); // 이벤트 번호를 URL에서 가져옴
  
  return (
    <div>
      <h1>리뷰 페이지</h1>
      <p>{eventNo}</p>
      {/* 리뷰 데이터를 API를 통해 가져와서 보여줄 수 있음 */}
    </div>
  );
}

export default Review;