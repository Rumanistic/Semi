package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.domain.Review;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
 
}
