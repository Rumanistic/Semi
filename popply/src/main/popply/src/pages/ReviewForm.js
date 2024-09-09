import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ReviewForm() {
    const { eventNo } = useParams(); // URL에서 eventNo 가져오기
    const [rate, setRate] = useState(0); // 별점 저장
    const [id, setId] = useState(''); // 사용자 아이디 저장
    const [error, setError] = useState(null); // 에러 상태
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // 서버에 보낼 데이터
        const reviewData = {
            eventNo: eventNo,
            id: id,
            rate: rate,
            createdDate: new Date().toISOString().split('T')[0], // 작성일은 현재 날짜
            isDeleted: 0
        };

        // 리뷰 추가 API 호출
        axios.post(`/reviews`, reviewData)
            .then(() => {
                alert('리뷰가 성공적으로 등록되었습니다.');
                navigate(`/reviews/event/${eventNo}`); // 리뷰 목록 페이지로 이동
            })
            .catch(err => {
                setError('리뷰 작성 중 오류가 발생했습니다.');
                console.error(err);
            });
    };

    return (
        <div>
            <h1>리뷰 작성</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="id">아이디:</label>
                    <input
                        type="text"
                        id="id"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="rate">별점 (1~5):</label>
                    <input
                        type="number"
                        id="rate"
                        value={rate}
                        onChange={(e) => setRate(parseInt(e.target.value))}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <button type="submit">리뷰 등록</button>
            </form>
        </div>
    );
}

export default ReviewForm;
