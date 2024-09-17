import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Review from './Review';
import {
  EventContainer,
  EventTitle,
  EventDetailItem,
  EventHeading,
  EventParagraph,
  EventLocation,
  EventImages,
  Button
} from './styles/EventDetailStyle'; // Import styled components

function EventDetail() {
  const { no } = useParams(); // URL에서 이벤트 번호를 가져옴
  const [event, setEvent] = useState(null);

  useEffect(() => {
    axios.get(`/detail/${no}`)
      .then(result => setEvent(result.data));
  }, [no]);

  return (
    <div>
      {event ? (
        <EventContainer>
          {/* 이미지 출력 */}
          <EventImages>
            {/* 이미지 출력 로직이 여기에 추가될 수 있습니다 */}
          </EventImages>

          <EventTitle>{event.title}</EventTitle>
          
          <EventDetailItem>
            <EventHeading>운영 날짜</EventHeading>
            <EventParagraph>{event.startDate} - {event.endDate}</EventParagraph>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>운영 시간</EventHeading>
            <EventParagraph>{event.openTime} ~ {event.closeTime}</EventParagraph>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>상세 정보</EventHeading>
            <EventParagraph>{event.content}</EventParagraph>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>위치</EventHeading>
            <EventLocation>{event.location}</EventLocation>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>안내 및 주의사항</EventHeading>
            <EventParagraph>{event.caution}</EventParagraph>
          </EventDetailItem>

          <Review eventNo={event.eventNo} eventTitle={event.title} />
        </EventContainer>
      ) : (
        <p>이벤트 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

export default EventDetail;
