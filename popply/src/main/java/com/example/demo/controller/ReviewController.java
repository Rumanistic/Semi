package com.example.demo.controller;

import com.example.demo.domain.Review;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService; // ReviewService를 주입받아 사용

    // 리뷰 추가
    @PostMapping
    public Review addReview(@RequestBody Review review) {
        // 새로운 리뷰를 추가하고 반환
        return reviewService.addReview(review);
    }

    // 리뷰 수정
    @PutMapping("/{id}")
    public Review updateReview(@PathVariable Long id, @RequestBody Review reviewDetails) {
        // 해당 ID의 리뷰를 찾아 수정하고 반환, 리뷰가 없으면 예외 처리
        Review updatedReview = reviewService.updateReview(id, reviewDetails);
        if (updatedReview != null) {
            return updatedReview;
        } else {
            throw new RuntimeException("리뷰를 찾을 수 없습니다.");
        }
    }

    // 특정 리뷰 조회
    @GetMapping("/{id}")
    public Review getReview(@PathVariable Long id) {
        // 해당 ID의 리뷰를 찾아 반환, 리뷰가 없으면 예외 처리
        Review review = reviewService.getReview(id);
        if (review != null) {
            return review;
        } else {
            throw new RuntimeException("리뷰를 찾을 수 없습니다.");
        }
    }

    // 특정 이벤트의 리뷰 리스트 조회
    @GetMapping("/event/{eventNo}")
    public List<Review> getReviewsByEventNo(@PathVariable Long eventNo) {
        // 해당 이벤트 번호의 리뷰 목록 반환
        return reviewService.getReviewsByEventNo(eventNo);
    }

    // 리뷰 삭제 (논리적 삭제)
    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable Long id) {
        // 리뷰가 존재하지 않을 경우 예외 처리
        boolean isDeleted = reviewService.deleteReview(id);
        if (!isDeleted) {
            throw new RuntimeException("리뷰를 찾을 수 없습니다.");
        }
    }
}
