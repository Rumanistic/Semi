import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetail() {
    const { page } = useParams();
    const navigate = useNavigate(); 

    const [events, setEvents] = useState([]);
    const [eventNo, setEventNo] = useState(1);

    const pageHandler = () => setEventNo(page);

    useEffect(() => {
        pageHandler();
        axios.get(`/event/detail/${eventNo}`)
            .then(result => {
                console.log(result.data);
                setEvents(result.data);
            })
            .catch(() => {
                console.log('실패');
            });
    }, [eventNo]); 

    const ReservationClick = () => {
        navigate(`/reservation/${eventNo}`);
    };

	const ReviewonClick = () => {
		navigate(`/review/${eventNo}`);
	}
    return (
        <>
            <h1>상세 페이지</h1>
            <img src={`${process.env.PUBLIC_URL}/img/img1.jpg`} className="img-style" alt="Event 1" />
            <img src={`${process.env.PUBLIC_URL}/img/img2.jpg`} className="img-style" alt="Event 2" />

            <div className='summary'>
                <h1 className="tit">{events.title}</h1>
                <h3>📅운영 날짜📅</h3>
                <h4 className='date'>{events.startDate} - {events.endDate}</h4>
                <p className='location'>{events.location}</p>
            </div>

            <hr />

            <div className='time'>
                <h3>운영시간</h3>
                <h4>{events.openTime} ~ {events.closeTime}</h4>
            </div>

            <hr />

            <div className='reservation'>
                <button onClick={ReservationClick}>예약하기</button> &emsp;&emsp;
                <button>리뷰</button>
            </div>

            <hr />

            <div className='introduction'>
                <h3>상세정보</h3>
                <p>{events.content}</p>
            </div>

            <hr />

            <div className='announce'>
                <h3>안내 및 주의사항</h3>
                <p>{events.caution}</p>
            </div>
            <hr />

            <div className='sns'>
                <button
                    className="button-link"
                    onClick={() => {
                        if (events.sns) {
                            window.open(events.sns, '_blank');
                        } else {
                            console.log("SNS 링크가 없습니다.");
							alert("SNS가 존재하지 않습니다");
						}
                    }}
                >
                    SNS로 이동하기
                </button>
            </div>
        </>
    );
}

export default EventDetail;
