package com.example.demo.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>  {

	@Query(value = "select tags from event", nativeQuery = true)
	List<String> findAllBy();

	@Query(value = "select * from event event where event.tags like (%:tag%)", nativeQuery = true)
	Set<Event> findAllBy(@Param("tag") String tag);

	

}
