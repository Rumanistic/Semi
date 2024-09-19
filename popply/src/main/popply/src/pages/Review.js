import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// './Review.css'; // 기존 CSS 파일 임포트는 제거합니다.

import {
  ReviewContainer,
  ReviewTitle,
  ReviewForm,
  ReviewInput,
  ReviewRatingSelect,
  Star,
  SubmitButton,
  ReviewList,
  ReviewItem,
  ReviewContent,
  ReviewRating,
  ReviewButton,
  NoReviews,
  ReviewTextArea,
  EditButton
} from './styles/ReviewStyle'; 



function Review({ eventNo, eventTitle }) {
  const [reviews, setReviews] = useState([]);  // 리뷰 목록 상태
  const [newReview, setNewReview] = useState('');  // 새로운 리뷰 내용
  const [selectedRating, setSelectedRating] = useState(0);  // 선택한 평점
  const [submitting, setSubmitting] = useState(false);  // 제출 중 상태
  const [editingReviewNo, setEditingReviewNo] = useState(0);  // 수정 중인 리뷰 ID
  const [editingContent, setEditingContent] = useState('');  // 수정 중인 리뷰 내용
  const [editingRating, setEditingRating] = useState(0);  // 수정 중인 평점

  // localStorage에서 사용자 ID 추출 
  const savedUser = localStorage.getItem('user');

  // 리뷰 목록 가져오기
  useEffect(() => {
    axios.get(`/review/${eventNo}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('리뷰 데이터를 가져오는 중 오류가 발생했습니다.', error);
      });
  }, [eventNo]);

  // 평점 클릭 처리
  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  // 리뷰 제출 처리
  const handleReviewSubmit = () => {
    if (!newReview || selectedRating === 0) {
      alert('리뷰 내용과 평점을 입력하세요.');
      return;
    }

    setSubmitting(true);

    const newReviewData = {
      content: newReview,
      rating: selectedRating,
      eventNo: eventNo,
      userId: savedUser, // 사용자 ID 추가 로그인시 입력한 id
    };

    // 서버에 리뷰 데이터 제출
    axios.post('/review/insert', newReviewData)
      .then(response => {
        setReviews([response.data,...reviews]); // 새로운 리뷰 추가
        setNewReview('');  // 입력 필드 초기화
        setSelectedRating(0);  // 평점 초기화
      })
      .catch(error => {
        console.error('리뷰 제출 중 오류가 발생했습니다.', error);
        alert(`리뷰 제출 중 오류: ${error.response ? error.response.data.message : error.message}`);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  // 리뷰 목록에서 특정 리뷰를 삭제하는 함수
  const handleReviewDelete = (reviewNo, reviewUserId) => {
    // 현재 로그인한 사용자가 작성한 리뷰인지 확인
    if (savedUser !== reviewUserId.toString()) { // reviewUserId를 문자열로 변환하여 비교
      alert('이 리뷰를 삭제할 권한이 없습니다.');
      return;
    }

    if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      axios.delete(`/review/delete/${reviewNo}`)
        .then(() => {
          // 리뷰 삭제 후 서버에서 최신 리뷰 데이터를 다시 불러옴
          axios.get(`/review/${eventNo}`)
            .then(response => {
              alert("삭제되었습니다.");
              setReviews(response.data);  // 서버에서 최신 리뷰 데이터로 상태 갱신
            })
            .catch(error => {
              console.error('리뷰 목록을 가져오는 중 오류가 발생했습니다.', error);
            });
        })
        .catch((error) => {
          console.error('리뷰 삭제 중 오류가 발생했습니다.', error);
          alert('리뷰 삭제 중 오류가 발생했습니다.');
        });
    }
  };

  // 리뷰 수정 버튼 클릭 처리
  const handleEditClick = (review) => {
    // 현재 로그인한 사용자가 작성한 리뷰인지 확인
    if (savedUser !== review.userId.toString()) { // review.userId를 문자열로 변환하여 비교
      alert('이 리뷰를 수정할 권한이 없습니다.');
      return;
    }

    setEditingReviewNo(review.reviewNo); // review.id가 올바르게 설정되었는지 확인
    setEditingContent(review.content);
    setEditingRating(review.rating);
  };

  // 리뷰 수정 제출 처리
  const handleReviewUpdate = () => {
    if (!editingContent || editingRating === 0) {
      alert('수정할 리뷰 내용과 평점을 입력하세요.');
      return;
    }

    const updatedReviewData = {
      content: editingContent,
      rating: editingRating,
    };

    axios.put(`/review/update/${editingReviewNo}`, updatedReviewData)
      .then(response => {
        setReviews(reviews.map(review =>
          review.id === editingReviewNo ? response.data : review
        ));
        setEditingReviewNo(0);  // 수정 모드 종료
        setEditingContent('');
        setEditingRating(0);

        //저장후 새로불러옴
        axios.get(`/review/${eventNo}`)
        .then(response => {
          setReviews(response.data);  // 서버에서 최신 리뷰 데이터로 상태 갱신
        })
        .catch(error => {
          console.error('리뷰 목록을 가져오는 중 오류가 발생했습니다.', error);
        });

      })
      .catch(error => {
        console.error('리뷰 수정 중 오류가 발생했습니다.', error);
        alert('리뷰 수정 중 오류가 발생했습니다.');
      });
  };

  // 별점 표시를 위한 함수
  const renderStars = (rating) => {
    return [...Array(5)].map((star, index) => (
      <Star key={index} selected={index < rating}>★</Star>
    ));
  };

  return (
    <ReviewContainer>
      <ReviewTitle>{eventTitle} 리뷰</ReviewTitle>

      {/* 리뷰 작성 폼 */}
      {savedUser ? (
        <ReviewForm>
          <ReviewInput
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="리뷰 내용을 작성하세요."
          />
          <ReviewRatingSelect>
            <p>평점 선택:</p>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Star
                key={rating}
                selected={selectedRating >= rating}
                onClick={() => handleRatingClick(rating)}
              >
                ★
              </Star>
            ))}
          </ReviewRatingSelect>
          <SubmitButton
            onClick={handleReviewSubmit}
            disabled={submitting}
          >
            {submitting ? '제출 중...' : '리뷰 제출'}
          </SubmitButton>
        </ReviewForm>
      ) : (
        <h2>로그인 후 이용 가능합니다!</h2>
      )}

      {/* 기존 리뷰 목록 */}
      {reviews.length > 0 ? (
        <ReviewList>
          {reviews.map(review => (
            <ReviewItem key={review.id}>
              {editingReviewNo === review.reviewNo ? (
                // 수정 모드일 때
                <>
                  <ReviewTextArea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <ReviewRatingSelect>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Star
                        key={rating}
                        onClick={() => setEditingRating(rating)}
                        selected={editingRating >= rating}
                      >
                        ★
                      </Star>
                    ))}
                  </ReviewRatingSelect>
                  <EditButton onClick={handleReviewUpdate}>수정 완료</EditButton>
                  <EditButton onClick={() => setEditingReviewNo(0)}>취소</EditButton>
                </>
              ) : (
                // 일반 모드일 때
                <>
                  <ReviewRating>{renderStars(review.rating)}</ReviewRating>
                  <ReviewContent>{review.content}</ReviewContent>
                  <p>{review.userId}</p>
                  {savedUser && savedUser === review.userId.toString() && ( 
                    <div>
                      <ReviewButton onClick={() => handleEditClick(review)}>수정</ReviewButton>
                      <ReviewButton onClick={() => handleReviewDelete(review.reviewNo, review.userId)}>삭제</ReviewButton>
                    </div>
                  )}
                </>
              )}
            </ReviewItem>
          ))}
        </ReviewList>
      ) : (
        <NoReviews>리뷰가 없습니다.</NoReviews>
      )}
    </ReviewContainer>
  );
}

export default Review;
