package com.example.demo.service;

import com.example.demo.domain.Review;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    // 리뷰 추가
    public Review addReview(Review review) {
        return reviewRepository.save(review); // 새로운 리뷰를 저장
    }

    // 리뷰 수정
    public Review updateReview(Long id, Review reviewDetails) {
        // 리뷰가 존재하는지 확인
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            Review existingReview = optionalReview.get();
            // 필요한 필드 업데이트 (예: 내용, 별점 등)
            existingReview.setContent(reviewDetails.getContent());
            existingReview.setRating(reviewDetails.getRating());
            // 수정된 리뷰 저장
            return reviewRepository.save(existingReview);
        }
        return null; // 리뷰가 없으면 null 반환
    }

    // 특정 리뷰 조회
    public Review getReview(Long id) {
        return reviewRepository.findById(id).orElse(null); // 리뷰를 찾거나 null 반환
    }

    // 특정 이벤트의 리뷰 리스트 조회
    public List<Review> getReviewsByEventNo(Long eventNo) {
        return reviewRepository.findByEventNo(eventNo); // 이벤트 번호에 해당하는 리뷰 목록 반환
    }

    // 리뷰 삭제 (논리적 삭제)
    public boolean deleteReview(Long id) {
        if (reviewRepository.existsById(id)) {
            reviewRepository.deleteById(id); // 리뷰가 존재하면 삭제
            return true;
        }
        return false; // 리뷰가 없으면 false 반환
    }
}
