package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Review;
import com.example.demo.domain.Users;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByEventNoOrderByCreatedDateDesc(Long eventNo);

 
	
}
