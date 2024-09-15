package com.example.demo.controller;

import com.example.demo.domain.Review;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    // 특정 이벤트의 리뷰 목록 조회
    @GetMapping("/{eventNo}")
    public List<Review> getReviews(@PathVariable(name="eventNo") Long eventNo) {
        return reviewService.getReviewsByEventNo(eventNo);
    }

    // 리뷰 생성
    @PostMapping("/insert")
    public Review createReview(@RequestBody Review review) {
        return reviewService.saveReview(review);
    }

    // 리뷰 삭제
    @DeleteMapping("/delete/{reviewNo}")
    public String deleteReview(@PathVariable(name="reviewNo") Long reviewNo) {
        reviewService.deleteReview(reviewNo);
        return "리뷰가 성공적으로 삭제되었습니다.";
    }

    // 리뷰 수정
    @PutMapping("/update/{reviewNo}")
    public Review updateReview(@PathVariable(name="reviewNo") Long reviewNo, @RequestBody Review review) {
        return reviewService.updateReview(reviewNo, review);
    }
}
