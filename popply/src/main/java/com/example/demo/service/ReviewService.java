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

    // 특정 이벤트의 리뷰 목록 조회
	public List<Review> getReviewsByEventNo(Long eventNo) {
		return reviewRepository.findByEventNoOrderByCreatedDateDesc(eventNo);
	}

    // 리뷰 저장 (생성)
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    // 리뷰 삭제
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new IllegalArgumentException("해당 ID의 리뷰를 찾을 수 없습니다.");
        }
        reviewRepository.deleteById(id);
    }

    // 리뷰 수정
    public Review updateReview(Long reviewNo, Review updatedReview) {
        Review existingReview = reviewRepository.findById(reviewNo)
            .orElseThrow(() -> new IllegalArgumentException("해당 ID의 리뷰를 찾을 수 없습니다."));
        
        existingReview.setContent(updatedReview.getContent());
        existingReview.setRating(updatedReview.getRating());
        return reviewRepository.save(existingReview);
    }
}
