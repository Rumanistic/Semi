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

    // 리뷰 저장
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    // 모든 리뷰 조회
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // 리뷰 삭제
    public void deleteReview(Long id) {
        // 존재하지 않는 리뷰를 삭제하려고 할 경우 예외를 처리할 수도 있습니다.
        reviewRepository.deleteById(id);
    }
}
