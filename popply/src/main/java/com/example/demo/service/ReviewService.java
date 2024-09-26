package com.example.demo.service;

import com.example.demo.domain.Event;
import com.example.demo.domain.Review;
import com.example.demo.domain.ReviewPoint;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
    
    public List<ReviewPoint> getReviewPointAvg(){
    	return reviewRepository.findAllByDeleted(0);
    }
    
    public List<ReviewPoint> getReviewPointAvg(Set<Long> eNos){
    	Set<ReviewPoint> pointSet = new HashSet<>();
        for(Long eventNo : eNos) {
            pointSet.addAll(reviewRepository.findAllByEventNoAndDeleted(eventNo, 0));
        }
        
        return new ArrayList<>(pointSet);
    }
    
}
