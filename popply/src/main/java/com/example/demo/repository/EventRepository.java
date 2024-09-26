package com.example.demo.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>  {
	
	@Query(value = "select * from event where is_deleted = :is_deleted order by 1 desc", nativeQuery = true)
	List<Event> findAllByDeleted(@Param("is_deleted") Boolean b);

	@Query(value = "select tags from event where is_deleted = 0", nativeQuery = true)
	List<String> findAllBy();

	@Query(value = "select * from event event where event.tags like (%:tag%) and is_deleted = 0 order by 1 desc", nativeQuery = true)
	Set<Event> findAllBy(@Param("tag") String tag);

	Optional<Event> findByEventNo(Long eventNo);
	
	List<Event> findTop8ByDeletedOrderByCreatedDateDesc(boolean deleted);

}
