package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Review;
import com.example.demo.domain.ReviewPoint;
import com.example.demo.domain.Users;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByEventNoOrderByCreatedDateDesc(Long eventNo);

	@Query(value = "select r.event_no as eventNo, avg(r.rating) as reviewPointAvg from review r where r.is_deleted = :i group by r.event_no", nativeQuery = true)
	List<ReviewPoint> findAllByDeleted(@Param("i") int i);
 
	
}
