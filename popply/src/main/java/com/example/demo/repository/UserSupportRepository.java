package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.UserSupport;
import java.util.List;


@Repository
public interface UserSupportRepository extends JpaRepository<UserSupport, Long>{
	List<UserSupport> findByDeleted(boolean deleted);
}
